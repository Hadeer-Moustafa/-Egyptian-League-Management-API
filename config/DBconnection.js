const mongoose = require("mongoose");
require("dotenv").config();
function DBConnection() {
  return new Promise((res, rej) => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        res("DB connected successfully...");
      })
      .catch((err) => rej(err));
  });
}
module.exports = DBConnection;
