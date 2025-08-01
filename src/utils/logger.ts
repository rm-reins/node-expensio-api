import winston from "winston";
import { config } from "../config";
import fs from "fs";
import path from "path";

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logger = winston.createLogger({
  level: config.environment === "production" ? "info" : "debug",

  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),

  defaultMeta: { service: "node-expensio-api" },

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ timestamp, level, message, ...meta }) =>
            `${timestamp} ${level}: ${message} ${
              Object.keys(meta).length && meta.service !== "node-expensio-api"
                ? JSON.stringify(meta, null, 2)
                : ""
            }`
        )
      ),
    }),

    new winston.transports.File({
      filename: path.join(
        logDir,
        `error-${new Date().toISOString().split("T")[0]}.log`
      ),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(
        logDir,
        `combined-${new Date().toISOString().split("T")[0]}.log`
      ),
    }),
  ],
});
