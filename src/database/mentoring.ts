import { db } from "@/database/connection";
import { Mentoring } from "@prisma/client";
import { logger } from "@/lib/logger";
import { TypeBooking } from "@/types/type-booking";

export const upsertMentoringByBooking = async (booking: TypeBooking[]) => {
  try {
    booking.forEach(async (item: TypeBooking) => {
      const host = await db.person.findUnique({
        where: { email: item.hostEmail },
      });
      if (!host?.id) {
        throw new Error("Host not found");
      }
      const attendee = await db.person.upsert({
        where: { email: item.attendeeEmail },
        update: { updatedAt: new Date() },
        create: {
          email: item.attendeeEmail,
          name: item.attendeeName,
          createdAt: new Date(),
          updatedAt: null,
          removedAt: null,
        },
      });
      await db.mentoring.upsert({
        where: {
          externalId: item.externalId,
        },
        update: {
          externalStatus: item.status,
          externalMessage: item.requestMessage,
          startTime: item.startTime,
          endTime: item.endTime,
          updatedAt: new Date(),
          removedAt: null,
        },
        create: {
          externalId: item.externalId,
          externalEventId: item.externalEventId,
          externalStatus: item.status,
          externalMessage: item.requestMessage,
          hostId: host.id,
          attendeeId: attendee.id,
          startTime: item.startTime,
          endTime: item.endTime,
          createdAt: new Date(),
          updatedAt: null,
          removedAt: null,
        },
      });
    });
  } catch (error) {
    logger.error(error);
  }
};

export const createMentoring = async (mentoring: Mentoring) => {
  try {
    const exists = await db.mentoring.findFirst({
      where: { id: mentoring.id },
    });
    if (exists) {
      return await db.mentoring.update({
        where: { id: exists.id },
        data: { ...mentoring, removedAt: null, updatedAt: new Date() },
      });
    }
    return await db.mentoring.create({
      data: {
        ...mentoring,
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const updateMentoring = async (id: string, mentoring: Mentoring) => {
  try {
    return await db.mentoring.update({
      where: { id },
      data: { ...mentoring, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removeMentoring = async (data: any) => {
  try {
    return await db.mentoring.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllMentorings = async (): Promise<Mentoring[]> => {
  try {
    return await db.mentoring.findMany({
      where: { removedAt: null },
      include: {
        host: true,
        attendee: true,
        avaliation: {
          where: {
            removedAt: null,
          },
        },
        invite: {
          where: {
            removedAt: null,
          },
        },
      },
      orderBy: { startTime: "asc" },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getAllAcceptedMentorings = async (): Promise<Mentoring[]> => {
  try {
    return await db.mentoring.findMany({
      where: { removedAt: null, externalStatus: "ACCEPTED" },
      include: {
        host: true,
        attendee: true,
        avaliation: {
          where: {
            removedAt: null,
          },
        },
        invite: {
          where: {
            removedAt: null,
          },
        },
      },
      orderBy: { startTime: "asc" },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getAllDoneMentoring = async (): Promise<Mentoring[]> => {
  try {
    return await db.mentoring.findMany({
      where: {
        removedAt: null,
        externalStatus: "ACCEPTED",
        startTime: { lte: new Date() },
      },
      include: {
        host: true,
        attendee: true,
        avaliation: {
          where: {
            removedAt: null,
          },
        },
        invite: {
          where: {
            removedAt: null,
          },
        },
      },
      orderBy: { startTime: "desc" },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getMentoring = async (id: string): Promise<Mentoring | null> => {
  try {
    return await db.mentoring.findUnique({
      where: { id, removedAt: null },
      include: { attendee: true },
    });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
