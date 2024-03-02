import { db } from "@/database/connection";
import { Avaliation } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createAvaliation = async (avaliation: Avaliation) => {
  try {
    await db.avaliation.create({
      data: {
        ...avaliation,
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const updateAvaliation = async (id: string, avaliation: Avaliation) => {
  try {
    await db.avaliation.update({
      where: { id },
      data: { ...avaliation, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removeAvaliation = async (data: any) => {
  try {
    await db.avaliation.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllAvaliations = async (): Promise<Avaliation[]> => {
  try {
    const result = await db.avaliation.findMany({ where: { removedAt: null } });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getAvaliation = async (id: string): Promise<Avaliation | null> => {
  try {
    const result = await db.avaliation.findUnique({
      where: { id, removedAt: null },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return null;
};
