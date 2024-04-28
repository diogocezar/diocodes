import prisma from "@/database/client";
import { WebhookLog } from "@prisma/client";
import { logger } from "@/lib/logger";
import { Prisma } from "@prisma/client";

export const createWebhookLog = async (webhook: WebhookLog) => {
  try {
    return await prisma.webhookLog.create({
      data: {
        ...webhook,
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
        payload: webhook.payload as Prisma.InputJsonValue,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removeWebhookLog = async (data: any) => {
  try {
    return await prisma.webhookLog.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllWebhookLog = async (): Promise<WebhookLog[]> => {
  try {
    return await prisma.webhookLog.findMany({
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
