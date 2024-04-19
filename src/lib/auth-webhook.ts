import crypto from "crypto";
import { logger } from "@/lib/logger";

export const authCalWebhook = (
  secret: string | undefined,
  signature: string | null,
  payload: any,
) => {
  if (!secret || !signature || !payload)
    throw new Error("Missing secret, payload or signature.");
  var hmacDigest = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("hex");
  logger.info(
    JSON.stringify({ secret, signature, hmacDigest, payload }, null, 2),
  );
  if (signature !== hmacDigest) {
    return false;
  }
  return true;
};
