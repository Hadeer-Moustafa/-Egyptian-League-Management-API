const { ERROR } = require("../utilities/httpstatus");
function notFound(req, res, next) {
  res
    .status(404)
    .json({ status: ERROR, message: "This resource is not found" });
}

module.exports = notFound;