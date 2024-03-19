import { TypeAvaliationTags } from "./type-avaliation-tags";
import { TypeMentoring } from "./type-mentoring";

export type TypeAvaliation = {
  id: string;
  mentoring: TypeMentoring;
  mentoringId: string;
  avaliationTags: TypeAvaliationTags[];
  rating: number;
  comment: string;
  showComment: boolean;
  wasSent: boolean;
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};
