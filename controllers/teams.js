const teams = require("../models/teams&matchs").Team;
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpstatus");

const getAllTeams = (req, res) => {
  let quary = req.query;
  const limit = quary.limit || 6;
  const page = quary.page || 1;
  const skip = (page - 1) * limit;
  teams
    .find({}, { __v: false })
    .limit(limit)
    .skip(skip)
    .then((data) => {
      res.json({ status: SUCCESS, data: { teams: data } });
    });
};

const getTeamById = (req, res) => {
  teams
    .findById(req.params.teamId, { __v: false })
    .then((data) => {
      if (data) {
        res.json({ status: SUCCESS, data: { team: data } });
      } else {
        res
          .status(404)
          .json({ status: FAIL, data: { team: "team not found" } });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: ERROR, message: err.message });
    });
};

const addTeam = async (req, res) => {
  try {
    const newTeam = new teams(req.body);

    await newTeam.save();
    res.status(201).json({ status: SUCCESS, data: { team: newTeam } });
  } catch (err) {
    res.status(400).json({ status: ERROR, message: err.message });
  }
};

const updateTeam = (req, res) => {
  teams
    .updateOne({ _id: req.params.teamId }, { $set: req.body })
    .then((data) => {
      if (data.matchedCount !== 0) {
        res.json({ status: SUCCESS, data: data });
      } else {
        res
          .status(404)
          .json({ status: FAIL, data: { team: "team not found" } });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: ERROR, message: err.message });
    });
};

const deleteTeam = (req, res) => {
  teams
    .deleteOne({ _id: req.params.teamId })
    .then((data) => {
      if (data.deletedCount !== 0) {
        res.json({ status: SUCCESS, data: null });
      } else {
        res
          .status(404)
          .json({ status: FAIL, data: { team: "team not found" } });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: ERROR, message: err.message });
    });
};

module.exports = {
  getAllTeams,
  deleteTeam,
  updateTeam,
  addTeam,
  getTeamById,
};
