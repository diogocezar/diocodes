import { db } from "@/database/connection";
import { Booking } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createBooking = async (booking: Booking) => {
  try {
    await db.booking.create({
      data: {
        ...booking,
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const updateBooking = async (id: string, booking: Booking) => {
  try {
    await db.booking.update({
      where: { id },
      data: { ...booking, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removeBooking = async (data: any) => {
  try {
    await db.booking.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllBookings = async (): Promise<Booking[]> => {
  try {
    const result = await db.booking.findMany({ where: { removedAt: null } });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getBooking = async (id: string): Promise<Booking | null> => {
  try {
    const result = await db.booking.findUnique({
      where: { id, removedAt: null },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return null;
};
