import Stripe from "stripe";
import { Resend } from "resend";
import { EMAIL } from "@/contants/email";
import { logger } from "@/lib/logger";
import EmailPaymentSucceeded from "#/emails/emails/email-payment-succeeded";
import { createPayment } from "@/database/payment";
import { upsertPerson } from "@/database/person";

export const revalidate = 0;
export const fetchCache = "force-no-store";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const resend = new Resend(process.env.API_RESEND);

const savePayment = async (payload: {
  name: string;
  email: string;
  phone: string;
  amount: number;
}) => {
  const { name, email, phone, amount } = payload;
  try {
    const person: any = {
      name,
      email,
      phone,
      createdAt: new Date(),
      updatedAt: null,
      removedAt: null,
    };
    const upsertedPerson = await upsertPerson(person);
    if (!upsertedPerson) {
      throw new Error("Error upserting person.");
    }
    const payment: any = {
      amount,
      personId: upsertedPerson?.id || "",
      mentoringId: null,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: null,
      removedAt: null,
    };
    const result = await createPayment(payment);
    logger.info("Payment saved.");
    logger.info(JSON.stringify(result, null, 2));
  } catch (error) {
    logger.error(error);
  }
};

const sendPaymentSucceeded = async (payload: {
  name: string;
  email: string;
  phone: string;
  amount: number;
}) => {
  const { name, email, phone, amount } = payload;
  try {
    const config = {
      from: EMAIL.FROM,
      to: [EMAIL.COPY_EMAIL],
      subject: EMAIL.SUBJECT_PAYMENT_SUCCEEDED,
      react: EmailPaymentSucceeded({
        name,
        email,
        phone,
        amount,
      }) as React.ReactElement,
    };
    await resend.emails.send(config);
    logger.info("Email sent.");
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
      const stripeCustomer: Stripe.Customer = (await stripe.customers.retrieve(
        customer.toString(),
      )) as Stripe.Customer;
      logger.info("Stripe customer");
      logger.info(JSON.stringify(stripeCustomer, null, 2));
      const { name, phone, email } = stripeCustomer;
      if (!name || !phone || !email) {
        logger.error("Missing name, phone or email.");
        return;
      }
      const newAmount = amount / 100;
      await sendPaymentSucceeded({ name, email, phone, amount: newAmount });
      await savePayment({ name, email, phone, amount: newAmount });
    }
    return new Response(JSON.stringify({ event }), { status: 200 });
  } catch (error) {
    logger.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
