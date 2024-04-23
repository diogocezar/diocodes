import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  try {
    if (
      req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      logger.error("[POST] api/cron/sync", "Unauthorized");
      return new Response("Unauthorized", { status: 401 });
    }
    logger.info("[POST] api/cron/sync", "worked!");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    logger.error("[POST] api/cron/sync", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
