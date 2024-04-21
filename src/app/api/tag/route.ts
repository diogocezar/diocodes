import { getAllTags } from "@/database/tag";
import { logger } from "@/lib/logger";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async () => {
  try {
    const result = await getAllTags();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/tag", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
