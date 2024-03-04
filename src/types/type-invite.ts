import { TypeMentoring } from "./type-mentoring";
import { TypePerson } from "./type-person";

export type TypeInvite = {
  id: string;
  mentoringId: string;
  mentoring: TypeMentoring;
  attendeeId: string;
  attendee: TypePerson;
  token?: string;
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};
