import { getMentoring } from "@/database/mentoring";
import { logger } from "@/lib/logger";
import { getErrorMessage, transformMeta } from "@/lib/utils";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async (
  _: Request,
  { params }: { params: { id: string } },
) => {
  const id = params.id;
  try {
    const result = await getMentoring(id);
    if (!result) {
      logger.info(
        `[GET] api/mentoring/${id}`,
        transformMeta({ founded: false }),
      );
      return new Response(JSON.stringify({ founded: false }), {
        status: 200,
      });
    }
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    logger.error(`[GET] api/mentoring/${id}`, getErrorMessage(error));
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
    });
  }
};
