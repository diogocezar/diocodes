import { getAllPersonsPro } from "@/database/person";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async () => {
  try {
    const result = await getAllPersonsPro();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/admin/person/pro", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
