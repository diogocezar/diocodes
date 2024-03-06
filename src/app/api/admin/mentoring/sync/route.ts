import { CAL } from "@/contants/cal";
import { compactName } from "@/lib/utils";
import { api as cal } from "@/services/cal";

const filterValidBooking = (mentoring: any) =>
  mentoring.filter(
    (item: any) =>
      item.eventTypeId === CAL.MENTORING_FREE && item.status !== "CANCELLED",
  );

const formatResponse = (validBookings: any) =>
  validBookings.map((item: any): any => {
    return {
      idCal: item.id,
      idEventType: item.eventTypeId,
      videoUrl: item.metadata.videoUrl,
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

export const GET = async () => {
  try {
    const result = await cal.get("/bookings");
    const { data } = result;
    const { bookings } = data;
    const validBookings = filterValidBooking(bookings);
    const response = formatResponse(validBookings);
    const ordered = sortByDate(response);
    const withoutDuplicates = removeDuplicates(ordered);
    return new Response(JSON.stringify(withoutDuplicates));
  } catch (error) {
    return new Response(JSON.stringify({ error }));
  }
};
