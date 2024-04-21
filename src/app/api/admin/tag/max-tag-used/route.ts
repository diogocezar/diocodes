import { getMaxUsedTag } from "@/database/tag";
import { logger } from "@/lib/logger";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async () => {
  try {
    const result = await getMaxUsedTag();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/admin/tag/max-tag-used", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
