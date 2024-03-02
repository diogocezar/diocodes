import { db } from "@/database/connection";
import { Mentoring } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createMentoring = async (mentoring: Mentoring) => {
  try {
    await db.mentoring.create({
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
    await db.mentoring.update({
      where: { id },
      data: { ...mentoring, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removeMentoring = async (data: any) => {
  try {
    await db.mentoring.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllMentorings = async (): Promise<Mentoring[]> => {
  try {
    const result = await db.mentoring.findMany({
      where: { removedAt: null },
      include: { host: true, attendee: true },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getMentoring = async (id: string): Promise<Mentoring | null> => {
  try {
    const result = await db.mentoring.findUnique({
      where: { id, removedAt: null },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return null;
};
