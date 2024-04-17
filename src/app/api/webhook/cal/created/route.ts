import { logger } from "@/lib/logger";
import crypto from "crypto";
import { TypeBooking } from "@/types/type-booking";
import { upsertMentoringByBooking } from "@/database/mentoring";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  try {
    const secret = process.env.WEBHOOK_CAL_SECRET;
    const signature = req.headers.get("X-Cal-Signature-256");
    const payload = await req.json();
    if (!secret || !signature || !payload)
      throw new Error("Missing secret, payload or signature.");
    var hmacDigest = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(payload))
      .digest("hex");
    logger.info(
      JSON.stringify({ secret, signature, hmacDigest, payload }, null, 2),
    );
    if (signature !== hmacDigest) {
      return new Response("Unauthorized", { status: 401 });
    }
    const booking: TypeBooking = {
      externalId: payload.payload.bookingId,
      externalEventId: payload.payload.eventTypeId,
      hostEmail: payload.payload.organizer.email,
      attendeeName: payload.payload.attendees[0].name,
      attendeeEmail: payload.payload.attendees[0].email,
      status: payload.payload.status,
      requestMessage: payload.payload.responses["como-posso-ajudar"],
      startTime: payload.payload.startTime,
      endTime: payload.payload.endTime,
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
