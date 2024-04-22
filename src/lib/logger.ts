import Transport from "winston-transport";
import winston from "winston";
import { createLog } from "@/database/logger";
const { combine, timestamp, json, printf } = winston.format;

class SaveMongoTransport extends Transport {
  constructor(opts: any) {
    super(opts);
  }
  async log(info: any, callback: Function) {
    await createLog(info);
    callback();
  }
}

const saveMongoTransport = new SaveMongoTransport({});

const customFormat = printf(({ level, message, timestamp, meta }) => {
  if (meta) {
    return `👉 [${timestamp}] ${level}: ${message} => ${JSON.stringify(meta)}`;
  }
  return `👉 [${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json(), customFormat),
  transports: [new winston.transports.Console(), saveMongoTransport],
});

export { logger };
