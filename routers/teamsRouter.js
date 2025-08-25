const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teams");
const verifyToken = require("../middleware/verifytoken");

router.get("/", teamsController.getAllTeams);
router.get("/:teamId", teamsController.getTeamById);
router.post("/",verifyToken, teamsController.addTeam);
router.patch("/:teamId",verifyToken, teamsController.updateTeam);
router.delete("/:teamId",verifyToken, teamsController.deleteTeam);

module.exports = router;
