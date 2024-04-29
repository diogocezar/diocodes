import { logger } from "@/lib/logger";
import { getMentoringByExternalId } from "@/database/mentoring";
import { createWebhookLog } from "@/database/webhook-log";
import { authCalWebhook } from "@/lib/auth-webhook";
import { sendReminderEmail } from "@/services/resend";
import { WEBHOOK } from "@/contants/webhook";
import { getErrorMessage, transformMeta } from "@/lib/utils";
import { api } from "@/services/cal";

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

    logger.info("[POST] api/webhook/cal/started => creating webhook log");

    await createWebhookLog({
      type: WEBHOOK.CAL_MEETING_STARTED,
      payload: JSON.stringify(data),
    } as any);

    const { id } = data;

    logger.info("[POST] api/webhook/cal/started => id", transformMeta(id));

    if (!id) throw new Error("Missing id");

    const mentoring = await getMentoringByExternalId(id);

    if (!mentoring) throw new Error("Mentoring not found");

    logger.info(
      "[POST] api/webhook/cal/started => mentoring",
      transformMeta(mentoring),
    );

    logger.info("[POST] api/webhook/cal/started => getting metadata");

    const bookingFromCal = await api.get(`bookings/${id}`);

    const { metadata } = bookingFromCal.data.booking;

    logger.info(
      "[POST] api/webhook/cal/started => returned metadata",
      transformMeta(metadata),
    );

    logger.info("[POST] api/webhook/cal/started => sending reminder email");

    await sendReminderEmail(mentoring, metadata.videoCallUrl);

    logger.info("[POST] api/webhook/cal/started => reminder sent");

    return new Response(JSON.stringify({ data, mentoring }, null, 2), {
      status: 200,
    });
  } catch (error) {
    logger.error("[POST] api/webhook/cal/started", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
