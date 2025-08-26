const { ERROR } = require("../utilities/httpstatus");
function globalErrorHandler(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    status: err.statusText || ERROR,
    message: err.message,
    data: null,
  });
}

module.exports = globalErrorHandler;