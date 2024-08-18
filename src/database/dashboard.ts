import { CAL } from "@/contants/cal";
import prisma from "@/database/client";
import { logger } from "@/lib/logger";
import { MongoClient, Document } from "mongodb";

export const countMentoringDone = async (): Promise<number> => {
  try {
    return prisma.mentoring.count({
      where: {
        removedAt: null,
        externalStatus: CAL.STATUS_ACCEPTED,
        startTime: { lte: new Date() },
        OR: [
          { externalEventId: CAL.MENTORING_PRO },
          { externalEventId: CAL.MENTORING_FREE },
        ],
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countMentoringToBe = async (): Promise<number> => {
  try {
    return prisma.mentoring.count({
      where: {
        removedAt: null,
        externalStatus: CAL.STATUS_ACCEPTED,
        OR: [
          { externalEventId: CAL.MENTORING_PRO },
          { externalEventId: CAL.MENTORING_FREE },
        ],
        startTime: { gte: new Date() },
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countMentoringCanceled = async (): Promise<number> => {
  try {
    return prisma.mentoring.count({
      where: {
        externalStatus: CAL.STATUS_CANCELLED,
        OR: [
          { externalEventId: CAL.MENTORING_PRO },
          { externalEventId: CAL.MENTORING_FREE },
        ],
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const sumPayments = async (): Promise<any> => {
  try {
    return prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const countMentoringPro = async (): Promise<number> => {
  try {
    return prisma.mentoring.count({
      where: {
        externalStatus: CAL.STATUS_ACCEPTED,
        externalEventId: CAL.MENTORING_PRO,
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countMentoringFree = async (): Promise<number> => {
  try {
    return prisma.mentoring.count({
      where: {
        externalStatus: CAL.STATUS_ACCEPTED,
        externalEventId: CAL.MENTORING_FREE,
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countMentoringTotal = async (): Promise<number> => {
  try {
    return prisma.mentoring.count({
      where: {
        removedAt: null,
        OR: [
          { externalEventId: CAL.MENTORING_PRO },
          { externalEventId: CAL.MENTORING_FREE },
        ],
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countAvaliationTotal = async (): Promise<number> => {
  try {
    return prisma.avaliation.count({
      where: {
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const averageAvaliationTotal = async (): Promise<number> => {
  try {
    const result = await prisma.avaliation.aggregate({
      _avg: { rating: true },
      where: {
        removedAt: null,
      },
    });
    if (!result) return 0;
    return result._avg.rating!;
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countInviteTotal = async (): Promise<number> => {
  try {
    return prisma.invite.count({
      where: {
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countTagTotal = async (): Promise<number> => {
  try {
    return prisma.tag.count({
      where: {
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countPersonTotal = async (): Promise<number> => {
  try {
    return prisma.person.count({
      where: {
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const getNextMentoring = async (): Promise<
  { attendee: { name: string; email: string }; id: string; startTime: Date }[]
> => {
  try {
    const result = await prisma.mentoring.findMany({
      where: {
        removedAt: null,
        startTime: { gte: new Date() },
        externalStatus: CAL.STATUS_ACCEPTED,
      },
      include: {
        attendee: true,
      },
      take: 6,
      orderBy: { startTime: "asc" },
    });
    return result.map((item) => ({
      id: item.id,
      attendee: item.attendee,
      startTime: item.startTime,
    }));
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getAvaliationsByMonth = async (): Promise<Document[]> => {
  try {
    const year = new Date().getFullYear();
    const first = new Date(year, 0, 1, 0, 0, 0, 0);
    const last = new Date(year, 11, 31, 23, 59, 59, 999);
    const agg = [
      {
        $match: {
          createdAt: {
            $gte: new Date(first),
            $lt: new Date(last),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%m",
              date: "$createdAt",
            },
          },
          avgRating: {
            $avg: "$rating",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];
    const client = await MongoClient.connect(process.env.URI_MONGODB!);
    const coll = client.db("diocodes").collection("Avaliation");
    const cursor = coll.aggregate(agg);
    const result = await cursor.toArray();
    await client.close();
    return result;
  } catch (error) {
    logger.error(error);
  }
  return [];
};
