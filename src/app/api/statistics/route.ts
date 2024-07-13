import {
  countMentoringDone,
  countMentoringPro,
  averageAvaliationTotal,
  countMentoringToBe,
} from "@/database/dashboard";
import { logger } from "@/lib/logger";
import { getErrorMessage } from "@/lib/utils";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const GET = async () => {
  try {
    const statistics = {
      totalMentoring: await countMentoringDone(),
      totalPro: await countMentoringPro(),
      avgAvaliation: await averageAvaliationTotal(),
      mentoringToBe: await countMentoringToBe(),
    };
    return new Response(JSON.stringify(statistics), { status: 200 });
  } catch (error) {
    logger.error("[GET] api/statistics", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
