import stripe from "stripe";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  try {
    const secret = process.env.WEBHOOK_STRIPE_SECRET;
    const signature = req.headers.get("stripe-signature");
    const payload = await req.json();
    if (!secret || !signature || !payload)
      throw new Error("Missing secret, payload or signature.");
    const event = stripe.webhooks.constructEvent(payload, signature, secret);
    console.log({ event });
    return new Response(JSON.stringify({ event }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
