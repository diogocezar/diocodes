import { compactName } from "@/lib/utils";
import { AvaliationResponse } from "@/types/type-avaliation-response";

const API_CAL = process.env.API_CAL;
const URL = "https://api.cal.com/v1/bookings";
const EVENT_ID = 634170;
const REVALIDATE = 120;

const filterValidBooking = (booking: any) =>
  booking.filter(
    (item: any) =>
      item.eventTypeId === EVENT_ID &&
      item.status !== "CANCELLED" &&
      new Date(item.endTime) < new Date(),
  );

const formatResponse = (validBookings: any) =>
  validBookings.map((item: any): AvaliationResponse => {
    return {
      id: item.id,
      attendees: compactName(item.attendees[0].name),
      startTime: item.startTime,
      endTime: item.endTime,
      email: item.attendees[0].email,
    };
  });

const sortByDate = (formatedResponse: any) =>
  formatedResponse.sort((a: AvaliationResponse, b: AvaliationResponse) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

const removeDuplicates = (ordered: any) =>
  ordered.filter(
    (item: AvaliationResponse, index: number, self: AvaliationResponse[]) =>
      index ===
      self.findIndex(
        (t) =>
          t.attendees === item.attendees &&
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
