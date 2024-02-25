import { db } from "@/database/connection";
import { Booking } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createBooking = async (booking: Booking) => {
  try {
    await db.booking.create({ data: booking });
    logger.info(`Booking created: ${booking.id}`);
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
    logger.info(`Booking updated: ${id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const removeBooking = async (id: string) => {
  try {
    await db.booking.update({
      where: { id },
      data: { removedAt: new Date() },
    });
    logger.info(`Booking removed: ${id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const getAllBookings = async (): Promise<Booking[]> => {
  try {
    logger.info("Getting all Tagss");
    return db.booking.findMany({ where: { removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getTag = async (id: string): Promise<Booking | null> => {
  try {
    logger.info(`Getting Tags: ${id}`);
    return db.booking.findUnique({ where: { id, removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
