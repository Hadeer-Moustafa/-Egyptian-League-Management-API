const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchs");
const verifyToken = require("../middleware/verifytoken");
const userRoles = require("../utilities/userRoles");
const allowedTo = require("../middleware/allowedTo");
const { matchesValidationSchema, validate } = require("../middleware/matchValidation");

router.get("/", matchController.getAllMatchs);
router.get("/:matchId", matchController.getMatchById);
router.post("/",verifyToken,allowedTo(userRoles.MANEGER,userRoles.ADMIN), matchController.addMatch);
router.patch("/:matchId",verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANEGER),matchesValidationSchema,validate, matchController.updateMatch);
router.delete("/:matchId",verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANEGER), matchController.deleteMatch);

module.exports = router;
