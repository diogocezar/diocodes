import { db } from "@/database/connection";
import { Tag } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createTag = async (tag: Tag) => {
  console.log(tag);
  try {
    const created = await db.tag.create({
      data: { ...tag, createdAt: new Date() },
    });
    logger.info(`Tag created: ${created}`);
  } catch (error) {
    logger.error(error);
  }
};

export const updateTag = async (id: string, tag: Tag) => {
  try {
    const updated = await db.tag.update({
      where: { id },
      data: { ...tag, updatedAt: new Date() },
    });
    logger.info(`Tag updated: ${updated}`);
  } catch (error) {
    logger.error(error);
  }
};

export const removeTag = async (data: any) => {
  try {
    const removed = await db.tag.deleteMany({
      where: { id: { in: data.idsToDelete } },
    });
    logger.info(`Tag removed: ${removed}`);
  } catch (error) {
    logger.error(error);
  }
};

export const getAllTags = async (): Promise<Tag[]> => {
  try {
    const result = await db.tag.findMany();
    logger.info(`Getting all tags: ${result}`);
    return result;
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getTag = async (id: string): Promise<Tag | null> => {
  try {
    const result = await db.tag.findUnique({ where: { id, removedAt: null } });
    logger.info(`Getting tag: ${result}`);
    return result;
  } catch (error) {
    logger.error(error);
  }
  return null;
};
