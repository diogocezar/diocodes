import { compactName } from "@/lib/utils";
import { BookingResponse } from "@/types/type-booking-response";

const API_CAL = process.env.API_CAL;
const URL = "https://api.cal.com/v1/bookings";
const EVENT_ID = 634170;
const REVALIDATE = 120;

const filterValidBooking = (booking: any) =>
  booking.filter(
    (item: any) => item.eventTypeId === EVENT_ID && item.status !== "CANCELLED",
  );

const formatResponse = (validBookings: any) =>
  validBookings.map((item: any): BookingResponse => {
    return {
      id: item.id,
      attendee: compactName(item.attendees[0].name),
      startTime: item.startTime,
      endTime: item.endTime,
      isActive: new Date(item.startTime).getTime() > new Date().getTime(),
    };
  });

const sortByDate = (formatedResponse: any) =>
  formatedResponse.sort((a: BookingResponse, b: BookingResponse) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

const removeDuplicates = (ordered: any) =>
  ordered.filter(
    (item: BookingResponse, index: number, self: BookingResponse[]) =>
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
    const result = await fetch(`${URL}?apiKey=${API_CAL}`, {
      next: { revalidate: REVALIDATE },
    });
    const data = await result.json();
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
