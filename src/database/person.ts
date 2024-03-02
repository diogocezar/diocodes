import { db } from "@/database/connection";
import { Person } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createPerson = async (person: Person) => {
  try {
    await db.person.create({
      data: {
        ...person,
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const updatePerson = async (id: string, person: Person) => {
  try {
    await db.person.update({
      where: { id },
      data: { ...person, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removePerson = async (data: any) => {
  try {
    await db.person.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllPersons = async (): Promise<Person[]> => {
  try {
    const result = await db.person.findMany({ where: { removedAt: null } });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getPerson = async (id: string): Promise<Person | null> => {
  try {
    const result = await db.person.findUnique({
      where: { id, removedAt: null },
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
  return null;
};
