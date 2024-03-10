import { CAL } from "@/contants/cal";
import { upsertMentoringByBooking } from "@/database/mentoring";
import { api as cal } from "@/services/cal";
import { logger } from "./logger";

const filterValidBooking = (mentoring: any) =>
  mentoring.filter(
    (item: any) =>
      (item.eventTypeId === CAL.MENTORING_FREE ||
        item.eventTypeId === CAL.MENTORING_PRO) &&
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

export const removeDuplicates = (ordered: any) =>
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

export const upsert = async (booking: any) => {
  await upsertMentoringByBooking(booking);
  return true;
};

export const sync = async ({ debug = false }: { debug: boolean }) => {
  debug && logger.info("🚀 Starting Sync");

  debug && logger.info("Getting Bookings from Cal API");
  const result = await cal.get("/bookings");
  const { data } = result;

  debug && logger.info(`Result data -> ${(JSON.stringify(data), null, 2)}`);

  const { bookings } = data;

  debug && logger.info("Filtering valid bookings");
  const validBookings = filterValidBooking(bookings);
  debug &&
    logger.info(
      `Filtering Response -> ${JSON.stringify(validBookings, null, 2)}`,
    );

  debug && logger.info("Formating response");
  const response = formatResponse(validBookings);
  debug &&
    logger.info(`Formated Response -> ${JSON.stringify(response, null, 2)}`);

  debug && logger.info("Ordering response");
  const ordered = sortByDate(response);
  debug &&
    logger.info(`Ordered Response -> ${JSON.stringify(ordered, null, 2)}`);

  debug && logger.info("Removing duplicates");
  const withoutDuplicates = removeDuplicates(ordered);
  debug &&
    logger.info(
      `Without duplicates -> ${JSON.stringify(withoutDuplicates, null, 2)}`,
    );
  debug && logger.info("Saving on Database");
  const upsertResult = await upsert(withoutDuplicates);
  debug &&
    logger.info(`Save result -> ${JSON.stringify(upsertResult, null, 2)}`);

  debug && logger.info("🚀 Finishing Sync");

  return upsertResult;
};
