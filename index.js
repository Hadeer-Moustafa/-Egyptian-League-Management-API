require("dotenv").config();
const express = require("express");
const { SUCCESS, FAIL, ERROR } = require("./utilities/httpstatus");
const app = express();

const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("MongoDB server running......");
});

app.use(express.json());

const teamsRouter = require("./routers/teamsRouter");
const matchsRouter = require("./routers/matchsRouter");
const userRouter = require("./routers/user.routes");

app.use("/teams", teamsRouter);
app.use("/matchs", matchsRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
  res
    .status(404)
    .json({ status: ERROR, message: "This resource is not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ status: ERROR, message: err.message });
});

app.listen(process.env.port, () => {
  console.log("server running");
});
