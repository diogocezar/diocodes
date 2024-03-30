import { sync } from "@/lib/sync";
import crypto from "crypto";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  try {
    const secret = process.env.WEBHOOK_CAL_SECRET;
    const signature = req.headers.get("X-Cal-Signature-256");
    if (!secret || !signature) throw new Error("Missing secret or signature");
    const payload = await req.json();
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload);
    const hmacValue = hmac.digest().toString();
    console.log({ secret, signature, hmacValue });
    if (signature !== hmacValue) {
      return new Response("Unauthorized", { status: 401 });
    }
    const result = await sync({ debug: true });
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
