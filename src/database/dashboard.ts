import { db } from "@/database/connection";
import { logger } from "@/lib/logger";
import { MongoClient, Document } from "mongodb";

export const dashboardCountMentoringDone = async (): Promise<number> => {
  try {
    const result = await db.mentoring.count({
      where: {
        removedAt: null,
        startTime: { lte: new Date() },
      },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const dashboardCountMentoringToBe = async (): Promise<number> => {
  try {
    const result = await db.mentoring.count({
      where: {
        removedAt: null,
        startTime: { gte: new Date() },
      },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const dashboardCountAvaliation = async (): Promise<number> => {
  try {
    const result = await db.avaliation.count({
      where: {
        removedAt: null,
      },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const dashboardCountAvaliationAvg = async (): Promise<number> => {
  try {
    const result = await db.avaliation.aggregate({
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

export const dashboardCountInvite = async (): Promise<number> => {
  try {
    const result = await db.invite.count({
      where: {
        removedAt: null,
      },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const dashboardCountTag = async (): Promise<number> => {
  try {
    const result = await db.tag.count({
      where: {
        removedAt: null,
      },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const dashboardCountPerson = async (): Promise<number> => {
  try {
    const result = await db.person.count({
      where: {
        removedAt: null,
      },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return 0;
};

export const dashboardAvaliationsByMonth = async (): Promise<Document[]> => {
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
