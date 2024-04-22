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
import { getErrorMessage, transformMeta } from "@/lib/utils";

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
    if (result)
      logger.info(
        "[POST] api/webhook/stripe => successful payment created",
        transformMeta(result),
      );
  } catch (error) {
    logger.error("[POST] api/webhook/stripe", getErrorMessage(error));
  }
};

export const POST = async (req: Request) => {
  logger.info("[POST] api/webhook/stripe => started");
  try {
    const payload = await req.text();
    if (!(await authStripeWebhook(req, payload))) {
      logger.info("[POST] api/webhook/stripe => unauthorized");
      return new Response("Unauthorized", { status: 401 });
    }
    const event = await constructEvent(req, payload);
    if (event.type === STRIPE.PAYMENT_INTENT_SUCCEEDED) {
      const payload: any = event.data.object;
      logger.info(
        "[POST] api/webhook/stripe => payment intent succeeded",
        transformMeta(payload),
      );

      logger.info("[POST] api/webhook/stripe => creating webhook log");
      await createWebhookLog({
        type: WEBHOOK.STRIPE_PAYMENT_INTENT_SUCCEEDED,
        payload: JSON.stringify(payload),
      } as any);

      const { amount, customer } = payload;
      if (!amount || !customer) {
        logger.error("[POST] api/webhook/stripe => missing amount or customer");
        return;
      }
      const stripeCustomer: Stripe.Customer = await getCustomer(
        customer.toString(),
      );
      logger.info(
        "[POST] api/webhook/stripe => customer",
        transformMeta(stripeCustomer),
      );
      const { name, phone, email } = stripeCustomer;
      if (!name || !phone || !email) {
        logger.error(
          "[POST] api/webhook/stripe => missing name, phone or email",
        );
        return;
      }
      const newAmount = amount / 100;
      await sendPaymentSucceededEmail({
        name,
        email,
        phone,
        amount: newAmount,
      });
      logger.info("[POST] api/webhook/stripe => sent payment succeeded email");
      await savePayment({ name, email, phone, amount: newAmount });
      logger.info("[POST] api/webhook/stripe => save payment");
    }
    return new Response(JSON.stringify({ event }), { status: 200 });
  } catch (error) {
    logger.error("[POST] api/webhook/stripe", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
