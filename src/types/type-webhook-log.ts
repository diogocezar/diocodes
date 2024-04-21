export type TypeWebhookLog = {
  id: string;
  type: string;
  payload?: any;
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};
