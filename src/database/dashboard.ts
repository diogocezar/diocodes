import { db } from "@/database/connection";
import { logger } from "@/lib/logger";
import { MongoClient, Document } from "mongodb";

const fakeSlowResult = <T,>(result: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(result);
      },
      Math.floor(Math.random() * (400 - 100 + 1)) + 100,
    );
  });
};

export const countMentoringDone = async (): Promise<number> => {
  try {
    return fakeSlowResult(
      await db.mentoring.count({
        where: {
          removedAt: null,
          startTime: { lte: new Date() },
        },
      }),
    );
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countMentoringToBe = async (): Promise<number> => {
  try {
    return fakeSlowResult(
      await db.mentoring.count({
        where: {
          removedAt: null,
          startTime: { gte: new Date() },
        },
      }),
    );
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countMentoringTotal = async (): Promise<number> => {
  try {
    return fakeSlowResult(
      await db.mentoring.count({
        where: {
          removedAt: null,
        },
      }),
    );
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countAvaliationTotal = async (): Promise<number> => {
  try {
    return await fakeSlowResult(
      db.avaliation.count({
        where: {
          removedAt: null,
        },
      }),
    );
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const averageAvaliationTotal = async (): Promise<number> => {
  try {
    const result = await fakeSlowResult(
      db.avaliation.aggregate({
        _avg: { rating: true },
        where: {
          removedAt: null,
        },
      }),
    );
    if (!result) return 0;
    return result._avg.rating!;
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countInviteTotal = async (): Promise<number> => {
  try {
    return await fakeSlowResult(
      db.invite.count({
        where: {
          removedAt: null,
        },
      }),
    );
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countTagTotal = async (): Promise<number> => {
  try {
    return await fakeSlowResult(
      db.tag.count({
        where: {
          removedAt: null,
        },
      }),
    );
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const countPersonTotal = async (): Promise<number> => {
  try {
    return await fakeSlowResult(
      db.person.count({
        where: {
          removedAt: null,
        },
      }),
    );
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const getNextMentoring = async (): Promise<
  { attendee: { name: string; email: string }; id: string; startTime: Date }[]
> => {
  try {
    const result = await fakeSlowResult(
      db.mentoring.findMany({
        where: { removedAt: null, startTime: { gte: new Date() } },
        include: {
          attendee: true,
        },
        take: 6,
        orderBy: { startTime: "asc" },
      }),
    );
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
