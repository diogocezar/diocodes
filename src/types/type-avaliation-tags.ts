import { TypeAvaliation } from "./type-avaliation";
import { TypeTag } from "./type-tag";

export type TypeAvaliationTags = {
  id: string;
  avaliation: TypeAvaliation;
  avaliationId: string;
  tag: TypeTag;
  tagId: string;
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};
