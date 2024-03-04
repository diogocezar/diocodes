import { db } from "@/database/connection";
import { Avaliation } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createAvaliation = async (
  avaliation: Avaliation & { avaliationTags: [] },
) => {
  try {
    const { mentoringId, comment, rating, wasSent, avaliationTags } =
      avaliation;
    const data = {
      mentoringId,
      comment,
      rating,
      wasSent,
      avaliationTags: {
        create: avaliationTags.map((tag) => ({
          tagId: (tag as { id: string })?.id,
        })),
      },
      createdAt: new Date(),
      updatedAt: null,
      removedAt: null,
    };
    await db.avaliation.create({
      data,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const updateAvaliation = async (
  id: string,
  avaliation: Avaliation & { avaliationTags: [] },
) => {
  try {
    const { mentoringId, comment, rating, wasSent, avaliationTags } =
      avaliation;
    await db.avaliationTags.deleteMany({
      where: { avaliationId: id },
    });
    const data = {
      mentoringId,
      comment,
      rating,
      wasSent,
      avaliationTags: {
        create: avaliationTags.map((tag) => ({
          tagId: (tag as { id: string })?.id,
        })),
      },
      updatedAt: new Date(),
      removedAt: null,
    };
    await db.avaliation.update({
      where: { id },
      data,
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
    const result = await db.avaliation.findMany({
      where: { removedAt: null },
      include: {
        avaliationTags: { include: { tag: true } },
        mentoring: { include: { attendee: true, host: true } },
      },
    });
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
