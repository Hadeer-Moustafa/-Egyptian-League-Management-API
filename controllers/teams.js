const teams = require("../models/teams&matchs").Team;
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpstatus");
const asyncWrapper = require("../middleware/asyncWrapper");

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
    res.json({ status: SUCCESS, data: { team: data } });
  } else {
    res.status(404).json({ status: FAIL, data: { team: "team not found" } });
  }
});

const addTeam = asyncWrapper(async (req, res) => {
  const newTeam = new teams(req.body);

  await newTeam.save();
  res.status(201).json({ status: SUCCESS, data: { team: newTeam } });
});

const updateTeam = asyncWrapper(async (req, res) => {
  const data = await teams.updateOne(
    { _id: req.params.teamId },
    { $set: req.body }
  );

  if (data.matchedCount !== 0) {
    res.json({ status: SUCCESS, data: data });
  } else {
    res.status(404).json({ status: FAIL, data: { team: "team not found" } });
  }
});

const deleteTeam = asyncWrapper(async (req, res) => {
  const data = await teams.deleteOne({ _id: req.params.teamId });

  if (data.deletedCount !== 0) {
    res.json({ status: SUCCESS, data: null });
  } else {
    res.status(404).json({ status: FAIL, data: { team: "team not found" } });
  }
});

module.exports = {
  getAllTeams,
  deleteTeam,
  updateTeam,
  addTeam,
  getTeamById,
};
