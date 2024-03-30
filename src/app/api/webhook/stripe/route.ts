import stripe from "stripe";
import { Resend } from "resend";
import { EMAIL } from "@/contants/email";
import { logger } from "@/lib/logger";
import EmailPaymentSucceeded from "#/emails/emails/email-payment-succeeded";

export const revalidate = 0;
export const fetchCache = "force-no-store";

const resend = new Resend(process.env.API_RESEND);

const sendPaymentSucceeded = async (payload: {
  name: string | undefined;
  phone: string | null | undefined;
  amount: number;
}) => {
  const { name, phone, amount } = payload;
  try {
    const config = {
      from: EMAIL.FROM,
      to: [EMAIL.COPY_EMAIL],
      subject: EMAIL.SUBJECT_PAYMENT_SUCCEEDED,
      react: EmailPaymentSucceeded({
        name,
        phone,
        amount,
      }) as React.ReactElement,
    };
    await resend.emails.send(config);
  } catch (error) {
    logger.error(error);
  }
};

export const POST = async (req: Request) => {
  try {
    const secret = process.env.WEBHOOK_STRIPE_SECRET;
    const signature = req.headers.get("stripe-signature");
    const payload = await req.text();
    if (!secret || !signature || !payload)
      throw new Error("Missing secret, payload or signature.");
    const event = stripe.webhooks.constructEvent(payload, signature, secret);
    if (event.type === "payment_intent.succeeded") {
      const payload = event.data.object;
      logger.info("Payment intent succeeded", payload);
      const { shipping, amount } = payload;
      if (!shipping) return;
      const { name, phone } = shipping;
      await sendPaymentSucceeded({ name, phone, amount });
    }
    return new Response(JSON.stringify({ event }), { status: 200 });
  } catch (error) {
    logger.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
