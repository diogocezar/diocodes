import prisma from "@/database/client";
import { Logger } from "@prisma/client";

export const createLogger = async (content: Logger) => {
  try {
    return await prisma.logger.create({
      data: {
        ...content,
        source: process.env.NODE_ENV || "unknown",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
