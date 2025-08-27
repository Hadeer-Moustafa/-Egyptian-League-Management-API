const teams = require("../models/teams&matchs").Team;
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpstatus");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utilities/appError");
const getAllTeams = asyncWrapper(async (req, res) => {
  let quary = req.query;
  const limit = quary.limit || 6;
  const page = quary.page || 1;
  const skip = (page - 1) * limit;
  const data = await teams.find({}, { __v: false }).limit(limit).skip(skip);

  res.json({ status: SUCCESS, data: { teams: data } });
});

const getTeamById = asyncWrapper(async (req, res) => {
  const data = await teams.findById(req.params.teamId, { __v: false });

  if (data) {
    return res.json({ status: SUCCESS, data: { team: data } });
  }
  throw AppError.create("team not found", 404, "Fail");
});

const addTeam = asyncWrapper(async (req, res) => {
  const { name, city, stadium, founded, logo } = req.body;
  const newTeam = new teams({
    name,
    city,
    stadium,
    founded,
    logo: req.file.filename,
  });

  await newTeam.save();
  res.status(201).json({ status: SUCCESS, data: { team: newTeam } });
});

const updateTeam = asyncWrapper(async (req, res) => {
  const data = await teams.updateOne(
    { _id: req.params.teamId },
    { $set: req.body }
  );

  if (data.matchedCount !== 0) {
    return res.json({ status: SUCCESS, data: data });
  }
  throw AppError.create("team not found", 404, "Fail");
});

const deleteTeam = asyncWrapper(async (req, res) => {
  const data = await teams.deleteOne({ _id: req.params.teamId });

  if (data.deletedCount !== 0) {
    return res.json({ status: SUCCESS, data: null });
  }
  throw AppError.create("team not found", 404, "Fail");
});

module.exports = {
  getAllTeams,
  deleteTeam,
  updateTeam,
  addTeam,
  getTeamById,
};
