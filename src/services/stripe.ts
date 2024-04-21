import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const constructEvent = async (req: Request) => {
  const secret = process.env.WEBHOOK_STRIPE_SECRET;
  const signature = req.headers.get("stripe-signature");
  const payload = await req.text();
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
