import { db } from "@/database/connection";
import { Tag } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createTag = async (tag: Tag) => {
  try {
    const exists = await db.tag.findFirst({
      where: { name: tag.name },
    });
    if (exists) {
      return await db.mentoring.update({
        where: { id: exists.id },
        data: { ...tag, removedAt: null, updatedAt: new Date() },
      });
    }
    return await db.tag.create({
      data: { ...tag, createdAt: new Date(), updatedAt: null, removedAt: null },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const updateTag = async (id: string, tag: Tag) => {
  try {
    return await db.tag.update({
      where: { id },
      data: { ...tag, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removeTag = async (data: any) => {
  try {
    return await db.tag.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllTags = async (): Promise<Tag[]> => {
  try {
    return await db.tag.findMany({
      where: {
        removedAt: null,
      },
      include: { avaliationTags: true },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getTag = async (id: string): Promise<Tag | null> => {
  try {
    return await db.tag.findUnique({ where: { id, removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
