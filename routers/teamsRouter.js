const express = require("express");
const router = express.Router();
const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = `Team ${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];
  if (fileType === "image") {
    return cb(null, true);
  } else {
    cb(appError.create("image only allowed", 400), false);
  }
};
const upload = multer({ storage: diskStorage, fileFilter });
const teamsController = require("../controllers/teams");
const verifyToken = require("../middleware/verifytoken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utilities/userRoles");
const appError = require("../utilities/appError");

router.get("/", teamsController.getAllTeams);
router.get("/:teamId", teamsController.getTeamById);
router.post(
  "/",
  verifyToken,
  upload.single("logo"),
  allowedTo(userRoles.MANEGER),
  teamsController.addTeam
);
router.patch(
  "/:teamId",
  verifyToken,
  allowedTo(userRoles.ADMIN, userRoles.MANEGER),
  teamsController.updateTeam
);
router.delete(
  "/:teamId",
  verifyToken,
  allowedTo(userRoles.ADMIN, userRoles.MANEGER),
  teamsController.deleteTeam
);

module.exports = router;
