import { logger } from "@/lib/logger";
import { sync } from "@/lib/sync";
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
    const result = await sync({ debug: true });
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    logger.error("[POST] api/cron/sync", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
