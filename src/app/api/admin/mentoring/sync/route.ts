import { logger } from "@/lib/logger";
import { sync } from "@/lib/sync";
import { getErrorMessage } from "@/lib/utils";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async () => {
  try {
    const result = await sync({ debug: true });
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/admin/mentoring/sync", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
