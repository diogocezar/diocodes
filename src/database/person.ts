import prisma from "@/database/client";
import { Person } from "@prisma/client";
import { logger } from "@/lib/logger";
import { CAL } from "@/contants/cal";

export const upsertPerson = async (person: Person) => {
  try {
    return await prisma.person.upsert({
      where: { email: person.email },
      update: { ...person, updatedAt: new Date() },
      create: {
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

export const getAllPersonsPro = async (): Promise<Person[]> => {
  try {
    const mentoringPro = await prisma.mentoring.findMany({
      where: {
        removedAt: null,
        externalStatus: "ACCEPTED",
        externalEventId: CAL.MENTORING_PRO,
      },
      include: {
        attendee: true,
      },
      orderBy: { startTime: "desc" },
    });

    const uniqueAttendees = new Set<string>();
    const nonDuplicatedPersons: Person[] = [];

    mentoringPro.forEach((mentoring: any) => {
      const attendee = mentoring.attendee;
      if (!uniqueAttendees.has(attendee.id)) {
        uniqueAttendees.add(attendee.id);
        nonDuplicatedPersons.push(attendee);
      }
    });

    return nonDuplicatedPersons;
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
