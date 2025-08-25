const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchs");

router.get("/", matchController.getAllMatchs);
router.get("/:matchId", matchController.getMatchById);
router.post("/", matchController.addMatch);
router.patch("/:matchId", matchController.updateMatch);
router.delete("/:matchId", matchController.deleteMatch);

module.exports = router;
