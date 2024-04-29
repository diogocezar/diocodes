import prisma from "@/database/client";
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
    const exists = await prisma.avaliation.findFirst({
      where: { mentoringId },
    });
    if (exists) {
      const where = {
        avaliationId: exists.id,
      };
      await prisma.avaliationTags.updateMany({
        where,
        data: { removedAt: new Date() },
      });
      return await prisma.avaliation.update({
        where: { id: exists.id },
        data: { ...data, removedAt: null, updatedAt: new Date() },
      });
    } else {
      return await prisma.avaliation.create({
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
    const { mentoringId, comment, rating, avaliationTags, showComment } =
      avaliation;
    await prisma.avaliationTags.deleteMany({
      where: { avaliationId: id },
    });
    const data = {
      mentoringId,
      comment,
      rating,
      showComment,
      updatedAt: new Date(),
      removedAt: null,
    };
    const avaliationTagsToCreate = avaliationTags.map((tag) => ({
      avaliationId: id,
      tagId: (tag as { id: string })?.id,
      removedAt: null,
    }));
    await prisma.avaliation.update({
      where: { id },
      data,
    });
    await prisma.avaliationTags.createMany({
      data: avaliationTagsToCreate,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removeAvaliation = async (data: any) => {
  try {
    await prisma.avaliation.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
    await prisma.avaliationTags.updateMany({
      where: { avaliationId: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllAvaliations = async (): Promise<Avaliation[]> => {
  try {
    return await prisma.avaliation.findMany({
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
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getAllComments = async (): Promise<Avaliation[]> => {
  try {
    return await prisma.avaliation.findMany({
      where: {
        removedAt: null,
        showComment: true,
      },
      include: {
        mentoring: { include: { attendee: true } },
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getAvaliation = async (id: string): Promise<Avaliation | null> => {
  try {
    return await prisma.avaliation.findUnique({
      where: { id, removedAt: null },
      include: {
        avaliationTags: {
          include: { tag: true },
        },
        mentoring: {
          include: {
            attendee: true,
            host: true,
          },
        },
      },
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
    return await prisma.avaliation.findUnique({
      where: { mentoringId, removedAt: null },
      include: {
        avaliationTags: {
          include: { tag: true },
        },
        mentoring: {
          include: {
            attendee: true,
            host: true,
          },
        },
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
