import { TypeMentoring } from "./type-mentoring";

export type TypeInvite = {
  id: string;
  mentoringId: string;
  mentoring: TypeMentoring;
  token?: string;
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};
