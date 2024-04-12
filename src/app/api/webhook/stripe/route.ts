import Stripe from "stripe";
import { Resend } from "resend";
import { EMAIL } from "@/contants/email";
import { logger } from "@/lib/logger";
import EmailPaymentSucceeded from "#/emails/emails/email-payment-succeeded";

export const revalidate = 0;
export const fetchCache = "force-no-store";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
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
      logger.info("Payment intent succeeded");
      logger.info(JSON.stringify(payload, null, 2));
      const { amount, customer } = payload;
      if (!amount || !customer) {
        logger.error("Missing amount or customer.");
        return;
      }
      const stripeCustomer = await stripe.customers.retrieve(
        customer.toString(),
      );
      logger.info("Stripe customer");
      logger.info(JSON.stringify(stripeCustomer, null, 2));

      //await sendPaymentSucceeded({ name, phone, amount });
    }
    return new Response(JSON.stringify({ event }), { status: 200 });
  } catch (error) {
    logger.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
