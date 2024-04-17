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
    const data = await req.json();
    if (!secret || !signature || !data)
      throw new Error("Missing secret, payload or signature.");
    var hmacDigest = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(data))
      .digest("hex");
    logger.info(
      JSON.stringify({ secret, signature, hmacDigest, data }, null, 2),
    );
    if (signature !== hmacDigest) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { payload } = data;
    const booking: TypeBooking = {
      externalId: payload.bookingId,
      externalEventId: payload.eventTypeId,
      hostEmail: payload.organizer.email,
      attendeeName: payload.attendees[0].name,
      attendeeEmail: payload.attendees[0].email,
      status: payload.status,
      requestMessage: payload.responses["como-posso-ajudar"] || "",
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
