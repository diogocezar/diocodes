import { logger } from "@/lib/logger";
import { TypeBooking } from "@/types/type-booking";
import { upsertMentoringByBooking } from "@/database/mentoring";
import { createWebhookLog } from "@/database/webhook-log";
import { authCalWebhook } from "@/lib/auth-webhook";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  try {
    const secret = process.env.WEBHOOK_CAL_SECRET;
    const signature = req.headers.get("X-Cal-Signature-256");
    const data = await req.json();
    if (!authCalWebhook(secret, signature, data)) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { payload } = data;
    logger.info("Creating webhook log");
    await createWebhookLog({
      type: "CAL_BOOKING_CREATED",
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
    logger.info("Booking", JSON.stringify(booking, null, 2));
    await upsertMentoringByBooking([booking]);
    logger.info("Finished upsertMentoringByBooking");
    return new Response(JSON.stringify({ payload }), { status: 200 });
  } catch (error) {
    logger.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
