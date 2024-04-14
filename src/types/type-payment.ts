import { TypeMentoring } from "./type-mentoring";
import { TypePerson } from "./type-person";

export type TypePayment = {
  id: string;
  amount: Number;
  mentoringId?: string;
  mentoring?: TypeMentoring;
  personId: string;
  person: TypePerson;
  date: Date;
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};
