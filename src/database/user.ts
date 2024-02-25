import { db } from "@/database/connection";
import { User } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createUser = async (user: User) => {
  try {
    await db.user.create({ data: user });
    logger.info(`User created: ${user.id}`);
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
    logger.info(`User updated: ${id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const removeUser = async (id: string) => {
  try {
    await db.user.update({
      where: { id },
      data: { removedAt: new Date() },
    });
    logger.info(`User removed: ${id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    logger.info("Getting all Users");
    return db.user.findMany({ where: { removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getUser = async (id: string): Promise<User | null> => {
  try {
    logger.info(`Getting User: ${id}`);
    return db.user.findUnique({ where: { id, removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
