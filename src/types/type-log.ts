export type TypeLog = {
  id: string;
  timestamp: Date;
  source: string;
  level: string;
  message: string;
  meta?: any;
  createdAt: Date;
  removedAt?: Date;
  updatedAt?: Date;
};
