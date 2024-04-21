import { logger } from "@/lib/logger";
import { getMentoring } from "@/database/mentoring";
import { createInvite } from "@/database/invite";
import { createWebhookLog } from "@/database/webhook-log";
import { authCalWebhook } from "@/lib/auth-webhook";
import { sendReminderEmail } from "@/services/resend";
import { WEBHOOK } from "@/contants/webhook";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  try {
    if (!(await authCalWebhook(req))) {
      return new Response("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    const { payload } = data;
    logger.info("Creating webhook log");
    await createWebhookLog({
      type: WEBHOOK.CAL_MEETING_STARTED,
      payload: JSON.stringify(data),
    } as any);
    const { id: externalId, metadata } = payload;
    logger.info("External ID", externalId);
    logger.info("Metadata", JSON.stringify(metadata, null, 2));
    if (!externalId || !metadata.videoCallUrl)
      throw new Error("Missing external ID or Metadata");

    const mentoring = await getMentoring(externalId);
    logger.info("Mentoring", JSON.stringify(mentoring, null, 2));

    if (!mentoring) throw new Error("Mentoring not found");
    if (mentoring) await sendReminderEmail(mentoring, metadata.videoCallUrl);
    logger.info("Invite Sent");
    const invite = await createInvite({
      createdAt: new Date(),
      mentoringId: mentoring.id,
    } as any);

    logger.info("Invite Created", JSON.stringify(invite, null, 2));

    return new Response(JSON.stringify({ data, mentoring, invite }, null, 2), {
      status: 200,
    });
  } catch (error) {
    logger.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
