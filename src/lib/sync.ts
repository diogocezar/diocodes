import { CAL } from "@/contants/cal";
import { upsertMentoringByBooking } from "@/database/mentoring";
import { api as cal } from "@/services/cal";
import { logger } from "./logger";
import { TypeBookingCal, TypeBooking } from "@/types/type-booking";
import { transformMeta } from "./utils";

const filterValidBooking = (mentoring: TypeBookingCal[]) =>
  mentoring.filter(
    (item: TypeBookingCal) =>
      item.eventTypeId === CAL.MENTORING_FREE ||
      item.eventTypeId === CAL.MENTORING_PRO,
  );

const formatResponse = (validBookings: TypeBookingCal[]) =>
  validBookings.map((item: TypeBookingCal): TypeBooking => {
    return {
      externalId: item.id,
      externalEventId: item.eventTypeId,
      hostEmail: item.user.email,
      attendeeName: item.attendees[0].name,
      attendeeEmail: item.attendees[0].email,
      status: item.status,
      requestMessage: item.responses["como-posso-ajudar"],
      phone: item.responses["phone"],
      startTime: item.startTime,
      endTime: item.endTime,
    };
  });

const sortByDate = (formatedResponse: TypeBooking[]) =>
  formatedResponse.sort((a: TypeBooking, b: TypeBooking) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

export const removeDuplicates = (ordered: TypeBooking[]) =>
  ordered.filter(
    (item: TypeBooking, index: number, self: TypeBooking[]) =>
      index ===
      self.findIndex(
        (t) =>
          t.attendeeEmail === item.attendeeEmail &&
          t.startTime === item.startTime &&
          t.endTime === item.endTime,
      ),
  );

export const upsert = async (booking: TypeBooking[]) => {
  await upsertMentoringByBooking(booking);
  return true;
};

export const sync = async ({ debug = false }: { debug: boolean }) => {
  debug && logger.info("[SYNC] starting sync");

  debug && logger.info("[SYNC] getting bookings from cal api");
  const result = await cal.get("/bookings");
  const { data } = result;

  debug && logger.info("[SYNC] result data", transformMeta(data));

  const { bookings } = data;

  debug && logger.info("[SYNC] filtering valid bookings");
  const validBookings = filterValidBooking(bookings);
  debug &&
    logger.info("[SYNC] filtering response", transformMeta(validBookings));

  debug && logger.info("[SYNC] formating response");
  const response = formatResponse(validBookings);
  debug && logger.info("[SYNC] formated response", transformMeta(response));
  debug && logger.info("[SYNC] ordering response");
  const ordered = sortByDate(response);
  debug && logger.info("[SYNC] ordered response", transformMeta(ordered));
  debug && logger.info("[SYNC] removing duplicates");
  const withoutDuplicates = removeDuplicates(ordered);
  debug &&
    logger.info("[SYNC] without duplicates", transformMeta(withoutDuplicates));
  debug && logger.info("[SYNC] saving on database");
  const upsertResult = await upsert(withoutDuplicates);
  debug && logger.info("[SYNC] save result", transformMeta(upsertResult));
  debug && logger.info("[SYNC] finishing sync");

  return upsertResult;
};
