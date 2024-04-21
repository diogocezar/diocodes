import {
  createAvaliation,
  getAvaliationByMentoring,
} from "@/database/avaliation";
import { logger } from "@/lib/logger";
import { sendAvaliationNotificationEmail } from "@/services/resend";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const avaliation = await getAvaliationByMentoring(data.mentoringId);
    if (avaliation)
      return new Response(
        JSON.stringify({ error: "Avaliation already exists" }),
        { status: 400 },
      );
    const result = await createAvaliation(data);
    if (result) {
      await sendAvaliationNotificationEmail(data);
      logger.info("[POST] api/avaliation", result);
      return new Response(JSON.stringify(result), { status: 201 });
    }
  } catch (error) {
    logger.error("[POST] api/avaliation", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
