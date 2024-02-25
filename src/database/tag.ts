import { db } from "@/database/connection";
import { Tag } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createTag = async (tag: Tag) => {
  try {
    await db.tag.create({ data: tag });
    logger.info(`Tag created: ${tag.id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const updateTag = async (id: string, tag: Tag) => {
  try {
    await db.tag.update({
      where: { id },
      data: { ...tag, updatedAt: new Date() },
    });
    logger.info(`Tag updated: ${id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const removeTag = async (id: string) => {
  try {
    await db.tag.update({
      where: { id },
      data: { removedAt: new Date() },
    });
    logger.info(`Tag removed: ${id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const getAllTags = async (): Promise<Tag[]> => {
  try {
    logger.info("Getting all tags");
    return db.tag.findMany({ where: { removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getTag = async (id: string): Promise<Tag | null> => {
  try {
    logger.info(`Getting tag: ${id}`);
    return db.tag.findUnique({ where: { id, removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
