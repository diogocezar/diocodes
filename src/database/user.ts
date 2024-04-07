import prisma from "@/database/client";
import { User } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createUser = async (user: User) => {
  try {
    const exists = await prisma.user.findFirst({
      where: { personId: user.personId },
    });
    if (exists) {
      return await prisma.user.update({
        where: { id: exists.id },
        data: { removedAt: null, updatedAt: new Date(), role: user.role },
      });
    }
    return await prisma.user.create({
      data: {
        ...user,
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const updateUser = async (id: string, user: User) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: { ...user, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removeUser = async (data: any) => {
  try {
    return await prisma.user.updateMany({
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
    return await prisma.user.findMany({
      where,
      include: { person: true },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getUser = async (id: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { id, removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
