import { db } from "@/database/connection";
import { Avaliation } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createAvaliation = async (
  avaliation: Avaliation & { avaliationTags: [] },
) => {
  try {
    const { mentoringId, comment, rating, avaliationTags } = avaliation;
    const data = {
      mentoringId,
      comment,
      rating,
      avaliationTags: {
        create: avaliationTags.map((tag) => ({
          tagId: (tag as { id: string })?.id,
          removedAt: null,
        })),
      },
      createdAt: new Date(),
      updatedAt: null,
      removedAt: null,
    };
    const exists = await db.avaliation.findFirst({
      where: { mentoringId },
    });
    if (exists) {
      const where = {
        avaliationId: exists.id,
      };
      await db.avaliationTags.updateMany({
        where,
        data: { removedAt: new Date() },
      });
      return await db.avaliation.update({
        where: { id: exists.id },
        data: { ...data, removedAt: null, updatedAt: new Date() },
      });
    } else {
      return await db.avaliation.create({
        data,
      });
    }
  } catch (error: any) {
    logger.error(error);
    throw new Error(error.message || "Erro ao criar avaliação");
  }
};

export const updateAvaliation = async (
  id: string,
  avaliation: Avaliation & { avaliationTags: [] },
) => {
  try {
    const { mentoringId, comment, rating, avaliationTags } = avaliation;
    await db.avaliationTags.deleteMany({
      where: { avaliationId: id },
    });
    const data = {
      mentoringId,
      comment,
      rating,
      avaliationTags: {
        create: avaliationTags.map((tag) => ({
          tagId: (tag as { id: string })?.id,
        })),
      },
      updatedAt: new Date(),
      removedAt: null,
    };
    return await db.avaliation.update({
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
    await db.avaliationTags.updateMany({
      where: { avaliationId: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllAvaliations = async (): Promise<Avaliation[]> => {
  try {
    return await db.avaliation.findMany({
      where: {
        removedAt: null,
      },
      include: {
        avaliationTags: {
          where: {
            removedAt: null,
          },
          include: { tag: true },
        },
        mentoring: { include: { attendee: true, host: true } },
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getAvaliation = async (id: string): Promise<Avaliation | null> => {
  try {
    return await db.avaliation.findUnique({
      where: { id, removedAt: null },
    });
  } catch (error) {
    logger.error(error);
  }
  return null;
};

export const getAvaliationByMentoring = async (
  mentoringId: string,
): Promise<Avaliation | null> => {
  try {
    const result = await db.avaliation.findUnique({
      where: { mentoringId, removedAt: null },
      include: { mentoring: true },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return null;
};
