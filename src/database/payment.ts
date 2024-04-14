import prisma from "@/database/client";
import { Payment } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createPayment = async (payment: Payment) => {
  try {
    return await prisma.payment.create({
      data: {
        ...payment,
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const updatePayment = async (id: string, payment: Payment) => {
  try {
    return await prisma.payment.update({
      where: { id },
      data: { ...payment, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removePayment = async (data: any) => {
  try {
    return await prisma.payment.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllPayments = async (): Promise<any[]> => {
  try {
    return await prisma.payment.findMany({
      where: { removedAt: null },
      include: {
        mentoring: {
          include: {
            attendee: true,
            host: true,
            payment: true,
            avaliation: true,
          },
        },
        person: true,
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getPayment = async (id: string): Promise<Payment | null> => {
  try {
    return await prisma.payment.findUnique({
      where: { id, removedAt: null },
    });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
