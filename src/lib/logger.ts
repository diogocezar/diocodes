import winston from "winston";
const { combine, timestamp, json, printf } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `👉 [${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json(), customFormat),
  transports: [new winston.transports.Console()],
});

export { logger };
