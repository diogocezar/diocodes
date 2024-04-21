import { getAllComments } from "@/database/avaliation";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async () => {
  try {
    const result = await getAllComments();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/comment", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
