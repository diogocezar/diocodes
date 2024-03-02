import { db } from "@/database/connection";
import { Tag } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createTag = async (tag: Tag) => {
  try {
    await db.tag.create({
      data: { ...tag, createdAt: new Date() },
    });
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
  } catch (error) {
    logger.error(error);
  }
};

export const removeTag = async (data: any) => {
  try {
    await db.tag.deleteMany({
      where: { id: { in: data.idsToDelete } },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllTags = async (): Promise<Tag[]> => {
  try {
    const result = await db.tag.findMany();
    return result;
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getTag = async (id: string): Promise<Tag | null> => {
  try {
    const result = await db.tag.findUnique({ where: { id, removedAt: null } });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return null;
};
