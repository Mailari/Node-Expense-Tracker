import winston from "winston";
import path from "path";

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create Winston logger instance
const logger = winston.createLogger({
  level: "info", // Default log level (can be 'error', 'warn', 'info', 'verbose', 'debug', 'silly')
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Timestamp format
    winston.format.json() // Default JSON format for file logging
  ),
  transports: [
    // File transport (for logging to files)
    new winston.transports.File({
      filename: path.join(process.cwd(), "/logs/error.log"),
      level: "error", // Only log 'error' level and above to this file
      handleExceptions: true,
    }),

    new winston.transports.File({
      filename: path.join(process.cwd(), "/logs/combined.log"),
      level: "info", // Log 'info' level and above to combined log
    }),
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

// Console logging for development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize log level for console output
        winston.format.simple() // Simple format for readability
      ),
    })
  );
}

export default logger;
