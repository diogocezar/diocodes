import { logger } from "@/lib/logger";
import {
  getMentoringByExternalId,
  updateMentoring,
} from "@/database/mentoring";
import { createWebhookLog } from "@/database/webhook-log";
import { authCalWebhook } from "@/lib/auth-webhook";
import { WEBHOOK } from "@/contants/webhook";
import { getErrorMessage, transformMeta } from "@/lib/utils";
import { CAL } from "@/contants/cal";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  logger.info("[POST] api/webhook/cal/canceled => started");
  try {
    const data = await req.json();

    if (!(await authCalWebhook(req, data))) {
      logger.info("[POST] api/webhook/cal/canceled => unauthorized");
      return new Response("Unauthorized", { status: 401 });
    }

    logger.info("[POST] api/webhook/cal/canceled => creating webhook log");

    await createWebhookLog({
      type: WEBHOOK.CAL_BOOKING_CANCELLED,
      payload: JSON.stringify(data),
    } as any);

    const { bookingId } = data;

    logger.info(
      "[POST] api/webhook/cal/canceled => id",
      transformMeta(bookingId),
    );

    if (!bookingId) throw new Error("Missing external ID");

    const mentoring = await getMentoringByExternalId(bookingId);

    if (!mentoring) throw new Error("Mentoring not found");

    logger.info(
      "[POST] api/webhook/cal/canceled => mentoring",
      transformMeta(mentoring),
    );

    logger.info(
      "[POST] api/webhook/cal/canceled => changing status to canceled",
    );

    const updatedMentoring = await updateMentoring(mentoring.id, {
      ...mentoring,
      externalStatus: CAL.STATUS_CANCELLED,
    });

    if (updatedMentoring)
      logger.info(
        "[POST] api/webhook/cal/canceled => changed status to canceled",
        transformMeta(updatedMentoring),
      );

    return new Response(
      JSON.stringify({ data, mentoring, updatedMentoring }, null, 2),
      {
        status: 200,
      },
    );
  } catch (error) {
    logger.error("[POST] api/webhook/cal/canceled", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
