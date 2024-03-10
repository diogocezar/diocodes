import { TypeAvaliation } from "./type-avaliation";
import { TypeInvite } from "./type-invite";
import { TypePerson } from "./type-person";

export type TypeMentoring = {
  id: string;
  externalId: Number;
  externalEventId: Number;
  externalStatus: string;
  externalMessage: string;
  host: TypePerson;
  hostId: string;
  attendee: TypePerson;
  attendeeId: string;
  invite: [TypeInvite];
  startTime: Date;
  endTime: Date;
  avaliation?: TypeAvaliation;
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};
