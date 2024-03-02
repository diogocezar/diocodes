import { TypeAvaliation } from "./type-avaliation";
import { TypePerson } from "./type-person";

export type TypeMentoring = {
  id: string;
  host: TypePerson;
  hostId: string;
  attendee: TypePerson;
  attendeeId: string;
  startTime: Date;
  endTime: Date;
  avaliation?: TypeAvaliation;
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};
