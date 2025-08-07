const logger = require("../utils/logger");

exports.errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};
