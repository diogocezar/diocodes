export type TypeTag = {
  id: string;
  name: string;
  avaliationTags: any[];
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};

export type TypeTagValueLabel = Record<"value" | "label", string>;
