import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const constructEvent = async (req: Request, payload: any) => {
  const secret = process.env.WEBHOOK_STRIPE_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature || !payload)
    throw new Error("Missing secret, payload or signature.");
  const event = stripe.webhooks.constructEvent(payload, signature, secret);
  return event;
};

export const getCustomer = async (customer: string) => {
  const stripeCustomer: Stripe.Customer = (await stripe.customers.retrieve(
    customer.toString(),
  )) as Stripe.Customer;
  return stripeCustomer;
};
