import crypto from "crypto";
import { logger } from "@/lib/logger";
import { constructEvent } from "@/services/stripe";

export const authCalWebhook = async (req: Request, payload: any) => {
  const secret = process.env.WEBHOOK_CAL_SECRET;
  const signature = req.headers.get("X-Cal-Signature-256");
  if (!secret || !signature || !payload)
    throw new Error("Missing secret, payload or signature.");
  var hmacDigest = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("hex");
  logger.info(
    `[AUTH_CALL_WEBHOOK] auth log => ${JSON.stringify({ secret, signature, hmacDigest, payload }, null, 2)}`,
  );
  if (signature !== hmacDigest) {
    return false;
  }
  return true;
};

export const authStripeWebhook = async (req: Request, payload: any) => {
  const event = constructEvent(req, payload);
  if (!event) {
    return false;
  }
  return true;
};
