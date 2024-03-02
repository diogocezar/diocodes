import { db } from "@/database/connection";
import { User } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createUser = async (user: User) => {
  try {
    const exists = await db.user.findFirst({
      where: { personId: user.personId },
    });
    if (exists) {
      await db.user.update({
        where: { id: exists.id },
        data: { removedAt: null, updatedAt: new Date() },
      });
    } else {
      await db.user.create({
        data: {
          ...user,
          createdAt: new Date(),
          updatedAt: null,
          removedAt: null,
        },
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const updateUser = async (id: string, user: User) => {
  try {
    await db.user.update({
      where: { id },
      data: { ...user, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removeUser = async (data: any) => {
  try {
    await db.user.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllUsers = async (role?: string): Promise<any[]> => {
  try {
    let where = {};
    if (role) {
      where = { removedAt: null, role };
    } else {
      where = { removedAt: null };
    }
    const result = await db.user.findMany({
      where,
      include: { person: true },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getUser = async (id: string): Promise<User | null> => {
  try {
    const result = await db.user.findUnique({ where: { id, removedAt: null } });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return null;
};
