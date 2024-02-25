import { db } from "@/database/connection";
import { Avaliation } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createAvaliation = async (avaliation: Avaliation) => {
  try {
    await db.avaliation.create({ data: avaliation });
    logger.info(`Avaliation created: ${avaliation.id}`);
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
    logger.info(`Avaliation updated: ${id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const removeAvaliation = async (id: string) => {
  try {
    await db.avaliation.update({
      where: { id },
      data: { removedAt: new Date() },
    });
    logger.info(`Avaliation removed: ${id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const getAllAvaliations = async (): Promise<Avaliation[]> => {
  try {
    logger.info("Getting all Tagss");
    return db.avaliation.findMany({ where: { removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getTag = async (id: string): Promise<Avaliation | null> => {
  try {
    logger.info(`Getting Tags: ${id}`);
    return db.avaliation.findUnique({ where: { id, removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
