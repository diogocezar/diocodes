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
