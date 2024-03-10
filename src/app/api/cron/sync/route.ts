import { CAL } from "@/contants/cal";
import { api as cal } from "@/services/cal";
import { upsertMentoringByBooking } from "@/database/mentoring";

export const revalidate = 0;
export const fetchCache = "force-no-store";

const filterValidBooking = (mentoring: any) =>
  mentoring.filter(
    (item: any) =>
      (item.eventTypeId === CAL.MENTORING_FREE ||
        item.eventTypeId === CAL.MENTORING_PREMIUM) &&
      item.status !== "CANCELLED",
  );

const formatResponse = (validBookings: any) =>
  validBookings.map((item: any): any => {
    return {
      externalId: item.id,
      externalEventId: item.eventTypeId,
      hostEmail: item.user.email,
      attendeeName: item.attendees[0].name,
      attendeeEmail: item.attendees[0].email,
      status: item.status,
      requestMessage: item.responses["como-posso-ajudar"],
      startTime: item.startTime,
      endTime: item.endTime,
    };
  });

const sortByDate = (formatedResponse: any) =>
  formatedResponse.sort((a: any, b: any) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

const removeDuplicates = (ordered: any) =>
  ordered.filter(
    (item: any, index: number, self: any[]) =>
      index ===
      self.findIndex(
        (t) =>
          t.attendee === item.attendee &&
          t.startTime === item.startTime &&
          t.endTime === item.endTime,
      ),
  );

const upsert = async (booking: any) => {
  await upsertMentoringByBooking(booking);
  return true;
};

export const GET = async (req: Request) => {
  try {
    if (
      req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return new Response("Unauthorized", { status: 401 });
    }
    const result = await cal.get("/bookings");
    const { data } = result;
    const { bookings } = data;
    const validBookings = filterValidBooking(bookings);
    const response = formatResponse(validBookings);
    const ordered = sortByDate(response);
    const withoutDuplicates = removeDuplicates(ordered);
    const upsertResult = await upsert(withoutDuplicates);
    return new Response(JSON.stringify({ upsertResult }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
