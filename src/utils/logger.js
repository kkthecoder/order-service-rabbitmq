const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // Set the default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: "error.log" })],
});

// Add console transport only if not in test environment
if (process.env.NODE_ENV !== "test") {
  logger.add(new winston.transports.Console());
}

module.exports = logger;
