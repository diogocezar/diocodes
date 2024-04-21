import { logger } from "@/lib/logger";
import { createPayment } from "@/database/payment";
import { upsertPerson } from "@/database/person";
import { createWebhookLog } from "@/database/webhook-log";
import { sendPaymentSucceededEmail } from "@/services/resend";
import { authStripeWebhook } from "@/lib/auth-webhook";
import { constructEvent, getCustomer } from "@/services/stripe";
import Stripe from "stripe";
import { WEBHOOK } from "@/contants/webhook";
import { STRIPE } from "@/contants/stripe";

export const revalidate = 0;
export const fetchCache = "force-no-store";

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

export const POST = async (req: Request) => {
  try {
    if (!(await authStripeWebhook(req))) {
      return new Response("Unauthorized", { status: 401 });
    }
    const event = await constructEvent(req);
    if (event.type === STRIPE.PAYMENT_INTENT_SUCCEEDED) {
      const payload: any = event.data.object;
      logger.info("Payment intent succeeded");
      logger.info(JSON.stringify(payload, null, 2));
      logger.info("Creating webhook log");
      await createWebhookLog({
        type: WEBHOOK.STRIPE_PAYMENT_INTENT_SUCCEEDED,
        payload: JSON.stringify(payload),
      } as any);
      const { amount, customer } = payload;
      if (!amount || !customer) {
        logger.error("Missing amount or customer.");
        return;
      }
      const stripeCustomer: Stripe.Customer = await getCustomer(
        customer.toString(),
      );
      logger.info("Stripe customer");
      logger.info(JSON.stringify(stripeCustomer, null, 2));
      const { name, phone, email } = stripeCustomer;
      if (!name || !phone || !email) {
        logger.error("Missing name, phone or email.");
        return;
      }
      const newAmount = amount / 100;
      await sendPaymentSucceededEmail({
        name,
        email,
        phone,
        amount: newAmount,
      });
      await savePayment({ name, email, phone, amount: newAmount });
    }
    return new Response(JSON.stringify({ event }), { status: 200 });
  } catch (error) {
    logger.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
