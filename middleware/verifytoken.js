const jwt = require("jsonwebtoken");
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpstatus");
const dotenv = require("dotenv");
dotenv.config();
const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
  return  res.status(401).json({ status: ERROR, message: "Token is required" });
  }
  const token = authHeader.split(" ")[1];
  try {
   const currentUser= jwt.verify(token, process.env.JWT_SECRET);
   req.currentUser=currentUser;
    next();
  } catch (err) {
   return res.status(401).json({ status: ERROR, message: "Invalid Token" });
  }
};
module.exports = verifyToken;
