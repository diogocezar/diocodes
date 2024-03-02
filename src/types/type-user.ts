import { TypePerson } from "./type-person";

export type TypeUser = {
  id: string;
  personId: string;
  role: string;
  person?: TypePerson;
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};
