const express = require("express");
const router= express.Router();

const teamsRouter = require("./teamsRouter");
const matchsRouter = require("./matchsRouter");
const userRouter = require("./user.routes");

router.use("/teams", teamsRouter);
router.use("/matchs", matchsRouter);
router.use("/users", userRouter);

module.exports= {apiRouter :router};