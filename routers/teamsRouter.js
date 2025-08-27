const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teams");
const verifyToken = require("../middleware/verifytoken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utilities/userRoles");

router.get("/", teamsController.getAllTeams);
router.get("/:teamId", teamsController.getTeamById);
router.post("/",verifyToken,allowedTo(userRoles.MANEGER), teamsController.addTeam);
router.patch("/:teamId",verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANEGER), teamsController.updateTeam);
router.delete("/:teamId",verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANEGER), teamsController.deleteTeam);

module.exports = router;
