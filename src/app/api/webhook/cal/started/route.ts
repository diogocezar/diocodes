import { logger } from "@/lib/logger";
import { getMentoring } from "@/database/mentoring";
import { createInvite } from "@/database/invite";
import { createWebhookLog } from "@/database/webhook-log";
import { authCalWebhook } from "@/lib/auth-webhook";
import { sendReminderEmail } from "@/services/resend";
import { WEBHOOK } from "@/contants/webhook";
import { getErrorMessage, transformMeta } from "@/lib/utils";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  logger.info("[POST] api/webhook/cal/started => started");
  try {
    const data = await req.json();
    if (!(await authCalWebhook(req, data))) {
      logger.info("[POST] api/webhook/cal/started => unauthorized");
      return new Response("Unauthorized", { status: 401 });
    }
    const { payload } = data;
    logger.info("[POST] api/webhook/cal/started => creating webhook log");
    await createWebhookLog({
      type: WEBHOOK.CAL_MEETING_STARTED,
      payload: JSON.stringify(data),
    } as any);
    const { id: externalId, metadata } = payload;
    logger.info(
      "[POST] api/webhook/cal/started => external id",
      transformMeta(externalId),
    );
    logger.info(
      "[POST] api/webhook/cal/started => metadata",
      transformMeta(metadata),
    );

    if (!externalId || metadata || !metadata.videoCallUrl)
      throw new Error("Missing external ID or Metadata");

    const mentoring = await getMentoring(externalId);

    if (!mentoring) throw new Error("Mentoring not found");

    logger.info(
      "[POST] api/webhook/cal/started => mentoring",
      transformMeta(mentoring),
    );

    await sendReminderEmail(mentoring, metadata.videoCallUrl);

    logger.info("[POST] api/webhook/cal/started => reminder sent");

    const invite = await createInvite({
      createdAt: new Date(),
      mentoringId: mentoring.id,
    } as any);

    if (invite)
      logger.info(
        "[POST] api/webhook/cal/started => invite created",
        transformMeta(invite),
      );

    return new Response(JSON.stringify({ data, mentoring, invite }, null, 2), {
      status: 200,
    });
  } catch (error) {
    logger.error("[POST] api/webhook/cal/started", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
