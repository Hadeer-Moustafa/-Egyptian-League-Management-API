const matchs = require("../models/teams&matchs").Match;
const e = require("express");
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpstatus");

const getAllMatchs = (req, res) => {
  let quary = req.query;
  const limit = quary.limit || 6;
  const page = quary.page || 1;
  const skip = (page - 1) * limit;
  matchs
    .find({}, { __v: false })
    .limit(limit)
    .skip(skip)
    .then((data) => {
      res.json({ status: SUCCESS, data: { matchs: data } });
    });
};

const getMatchById = (req, res) => {
  matchs
    .findById(req.params.matchId,{ __v: false })
    .then((data) => {
      if (data) {
        res.json({ status: SUCCESS, data: { match: data } });
      } else {
        res
          .status(404)
          .json({ status: FAIL, data: { match: "match not found" } });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: ERROR, message: err.message });
    });
};

const addMatch = async (req, res) => {
  try {
    const newMatch = new matchs(req.body);
    await newMatch.save().then((data) => {
      res.status(201).json({ status: SUCCESS, data: { match: data } });
    });
  } catch (err) {
    res.status(400).json({ status: ERROR, message: err.message });
  }
};

const updateMatch = (req, res) => {
  matchs
    .updateOne({ _id: req.params.matchId }, { $set: req.body })
    .then((data) => {
      if (data.matchedCount !== 0) {
        res.json({ status: SUCCESS, data: data });
      } else {
        res
          .status(404)
          .json({ status: FAIL, data: { match: "match not found" } });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: ERROR, message: err.message });
    });
};

const deleteMatch = (req, res) => {
  matchs
    .deleteOne({ _id: req.params.matchId })
    .then((data) => {
      if (data.deletedCount !== 0) {
        res.json({ status: SUCCESS, data: null });
      } else {
        res
          .status(404)
          .json({ status: FAIL, data: { match: "match not found" } });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: ERROR, message: err.message });
    });
};

module.exports = {
  getAllMatchs,
  deleteMatch,
  updateMatch,
  addMatch,
  getMatchById,
};
