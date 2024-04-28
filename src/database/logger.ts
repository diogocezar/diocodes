import prisma from "@/database/client";
import { logger } from "@/lib/logger";
import { Log } from "@prisma/client";

export const createLog = async (content: Log) => {
  try {
    await prisma.log.create({
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

export const removeLog = async (data: any) => {
  try {
    return await prisma.log.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllLog = async (): Promise<Log[]> => {
  try {
    return await prisma.log.findMany({
      where: {
        removedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};
