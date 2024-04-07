import prisma from "@/database/client";
import { Person } from "@prisma/client";
import { logger } from "@/lib/logger";

export const createPerson = async (person: Person) => {
  try {
    const exists = await prisma.person.findFirst({
      where: { name: person.name },
    });
    if (exists) {
      return await prisma.person.update({
        where: { id: exists.id },
        data: { ...person, removedAt: null, updatedAt: new Date() },
      });
    }
    return await prisma.person.create({
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
    return await prisma.person.update({
      where: { id },
      data: { ...person, updatedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const removePerson = async (data: any) => {
  try {
    return await prisma.person.updateMany({
      where: { id: { in: data.idsToDelete } },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAllPersons = async (): Promise<Person[]> => {
  try {
    return await prisma.person.findMany({
      where: { removedAt: null },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    logger.error(error);
  }
  return [];
};

export const getPerson = async (id: string): Promise<Person | null> => {
  try {
    return await prisma.person.findUnique({
      where: { id, removedAt: null },
    });
  } catch (error) {
    logger.error(error);
  }
  return null;
};
