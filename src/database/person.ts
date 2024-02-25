import { db } from "@/database/connection";
import { Person } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createPerson = async (person: Person) => {
  try {
    await db.person.create({ data: person });
    logger.info(`Person created: ${person.id}`);
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
    logger.info(`Person updated: ${id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const removePerson = async (id: string) => {
  try {
    await db.person.update({
      where: { id },
      data: { removedAt: new Date() },
    });
    logger.info(`Person removed: ${id}`);
  } catch (error) {
    logger.error(error);
  }
};

export const getAllPersons = async (): Promise<Person[]> => {
  try {
    logger.info("Getting all persons");
    return db.person.findMany({ where: { removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getPerson = async (id: string): Promise<Person | null> => {
  try {
    logger.info(`Getting person: ${id}`);
    return db.person.findUnique({ where: { id, removedAt: null } });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
