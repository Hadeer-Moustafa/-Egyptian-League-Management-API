const app = require("./index");
const DBConnection = require("./config/DBconnection");
require("dotenv").config();
const port = process.env.port || 3000;

DBConnection()
  .then((data) => {
    app.listen(port, () => {
      console.log(`server running on port ${port}...`);
      console.log(data);
    });
  })
  .catch((err) => {
    console.log(err);
  });
