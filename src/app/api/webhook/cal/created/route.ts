import { logger } from "@/lib/logger";
import { TypeBooking } from "@/types/type-booking";
import { upsertMentoringByBooking } from "@/database/mentoring";
import { createWebhookLog } from "@/database/webhook-log";
import { authCalWebhook } from "@/lib/auth-webhook";
import { WEBHOOK } from "@/contants/webhook";
import { getErrorMessage, transformMeta } from "@/lib/utils";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  logger.info("[POST] api/webhook/cal/created => started");
  try {
    const data = await req.json();
    if (!(await authCalWebhook(req, data))) {
      logger.info("[POST] api/webhook/cal/created => unauthorized");
      return new Response("Unauthorized", { status: 401 });
    }
    const { payload } = data;
    logger.info("[POST] api/webhook/cal/created => creating webhook log");
    await createWebhookLog({
      type: WEBHOOK.CAL_BOOKING_CREATED,
      payload: JSON.stringify(data),
    } as any);

    const booking: TypeBooking = {
      externalId: payload.bookingId,
      externalEventId: payload.eventTypeId,
      hostEmail: payload.organizer.email,
      attendeeName: payload.attendees[0].name,
      attendeeEmail: payload.attendees[0].email,
      status: payload.status,
      requestMessage: payload.responses["como-posso-ajudar"].value || "",
      startTime: payload.startTime,
      endTime: payload.endTime,
    };

    logger.info(
      "[POST] api/webhook/cal/created => booking",
      transformMeta(booking),
    );
    await upsertMentoringByBooking([booking]);

    logger.info("[POST] api/webhook/cal/created => finished");
    return new Response(JSON.stringify({ payload }), { status: 200 });
  } catch (error) {
    logger.error("[POST] api/webhook/cal/created", getErrorMessage(error));
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
