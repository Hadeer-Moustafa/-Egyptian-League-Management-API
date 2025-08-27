require("dotenv").config();
const express = require("express");
const { apiRouter } = require("./routers/main.route");
const notFound = require("./middleware/notFound");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const path = require("path");
const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api", apiRouter);

app.use(notFound);

app.use(globalErrorHandler);

module.exports = app;
