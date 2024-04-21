import { logger } from "@/lib/logger";
import { getMentoring } from "@/database/mentoring";
import { createInvite } from "@/database/invite";
import { createWebhookLog } from "@/database/webhook-log";
import { authCalWebhook } from "@/lib/auth-webhook";
import { sendInviteEmail } from "@/services/resend";
import { WEBHOOK } from "@/contants/webhook";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  logger.info("POST /webhook/cal/ended");
  try {
    if (!(await authCalWebhook(req))) {
      logger.info({ message: "Unauthorized", req });
      return new Response("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    logger.info("Creating webhook log");
    await createWebhookLog({
      type: WEBHOOK.CAL_MEETING_ENDED,
      payload: JSON.stringify(data),
    } as any);
    const { id: externalId } = data;
    logger.info("External ID", externalId);
    if (!externalId) throw new Error("Missing external ID");
    const mentoring = await getMentoring(externalId);
    logger.info("Mentoring", JSON.stringify(mentoring, null, 2));
    if (!mentoring) throw new Error("Mentoring not found");
    if (mentoring) await sendInviteEmail(mentoring);
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
