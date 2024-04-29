import { logger } from "@/lib/logger";
import { getMentoringByExternalId } from "@/database/mentoring";
import { createInvite } from "@/database/invite";
import { createWebhookLog } from "@/database/webhook-log";
import { authCalWebhook } from "@/lib/auth-webhook";
import { sendInviteEmail } from "@/services/resend";
import { WEBHOOK } from "@/contants/webhook";
import { getErrorMessage, transformMeta } from "@/lib/utils";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  logger.info("[POST] api/webhook/cal/ended => started");
  try {
    const data = await req.json();

    if (!(await authCalWebhook(req, data))) {
      logger.info("[POST] api/webhook/cal/ended => unauthorized");
      return new Response("Unauthorized", { status: 401 });
    }

    logger.info("[POST] api/webhook/cal/ended => creating webhook log");

    await createWebhookLog({
      type: WEBHOOK.CAL_MEETING_ENDED,
      payload: JSON.stringify(data),
    } as any);

    const { id } = data;

    logger.info("[POST] api/webhook/cal/ended => id", transformMeta(id));

    if (!id) throw new Error("Missing external ID");

    const mentoring = await getMentoringByExternalId(id);

    if (!mentoring) throw new Error("Mentoring not found");

    logger.info(
      "[POST] api/webhook/cal/ended => mentoring",
      transformMeta(mentoring),
    );

    logger.info(
      "[POST] api/webhook/cal/ended => creating invite to mentoring avaliation",
    );

    const invite = await createInvite({
      createdAt: new Date(),
      mentoringId: mentoring.id,
    } as any);

    if (invite)
      logger.info(
        "[POST] api/webhook/cal/started => invite created",
        transformMeta(invite),
      );

    if (mentoring && invite) await sendInviteEmail(mentoring);

    return new Response(JSON.stringify({ data, mentoring, invite }, null, 2), {
      status: 200,
    });
  } catch (error) {
    logger.error("[POST] api/webhook/cal/ended", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
