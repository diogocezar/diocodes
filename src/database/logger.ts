import prisma from "@/database/client";
import { logger } from "@/lib/logger";
import { Log } from "@prisma/client";

export const createLog = async (content: Log) => {
  try {
    return await prisma.log.create({
      data: {
        ...content,
        source: process.env.NODE_ENV || "unknown",
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllLog = async (): Promise<Log[]> => {
  try {
    return await prisma.log.findMany({
      where: {
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};
