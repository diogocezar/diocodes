import { sync } from "@/lib/sync";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  try {
    if (
      req.headers.get("X-Cal-Signature-256") !== process.env.WEBHOOK_CAL_SECRET
    ) {
      return new Response("Unauthorized", { status: 401 });
    }
    const result = await sync({ debug: true });
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
