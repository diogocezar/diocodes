import { sync } from "@/lib/sync";
import crypto from "crypto";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  try {
    const secret = process.env.WEBHOOK_CAL_SECRET;
    const signature = req.headers.get("X-Cal-Signature-256");
    const payload = await req.json();
    if (!secret || !signature || !payload)
      throw new Error("Missing secret, payload or signature.");
    var hmacDigest = crypto
      .createHmac("sha1", secret)
      .update(payload)
      .digest("hex");
    console.log({ secret, signature, hmacDigest, payload });
    if (signature !== hmacDigest) {
      return new Response("Unauthorized", { status: 401 });
    }
    const result = await sync({ debug: true });
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
