import { db } from "@/database/connection";
import { Invite } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createInvite = async (invite: Invite) => {
  try {
    await db.invite.create({
      data: {
        ...invite,
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const updateInvite = async (id: string, invite: Invite) => {
  try {
    await db.invite.update({
      where: { id },
      data: { ...invite, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removeInvite = async (data: any) => {
  try {
    await db.invite.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllInvites = async (): Promise<any[]> => {
  try {
    const result = await db.invite.findMany({
      include: {
        mentoring: { include: { attendee: true, host: true } },
      },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getInvite = async (id: string): Promise<Invite | null> => {
  try {
    const result = await db.invite.findUnique({
      where: { id, removedAt: null },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return null;
};
