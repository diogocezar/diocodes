import Stripe from "stripe";
import { logger } from "@/lib/logger";

export const revalidate = 0;
export const fetchCache = "force-no-store";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const GET = async () => {
  try {
    const customer = await stripe.customers.retrieve("cus_PuNSvjRLXUwpd9");
    return new Response(JSON.stringify({ customer }), { status: 200 });
  } catch (error) {
    logger.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
