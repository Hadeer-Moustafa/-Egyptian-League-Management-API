const matchs = require("../models/teams&matchs").Match;
const e = require("express");
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpstatus");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllMatchs = asyncWrapper(async (req, res) => {
  let quary = req.query;
  const limit = quary.limit || 6;
  const page = quary.page || 1;
  const skip = (page - 1) * limit;
  const data = await matchs.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: SUCCESS, data: { matchs: data } });
});

const getMatchById = asyncWrapper(async (req, res) => {
  const data = await matchs.findById(req.params.matchId, { __v: false });
  if (data) {
    res.json({ status: SUCCESS, data: { match: data } });
  } else {
    res.status(404).json({ status: FAIL, data: { match: "match not found" } });
  }
});

const addMatch = asyncWrapper(async (req, res) => {
  const newMatch = new matchs(req.body);
  await newMatch.save().then((data) => {
    res.status(201).json({ status: SUCCESS, data: { match: data } });
  });
});

const updateMatch = asyncWrapper(async (req, res) => {
  const data = await matchs.updateOne(
    { _id: req.params.matchId },
    { $set: req.body }
  );

  if (data.matchedCount !== 0) {
    res.json({ status: SUCCESS, data: data });
  } else {
    res.status(404).json({ status: FAIL, data: { match: "match not found" } });
  }
});

const deleteMatch = asyncWrapper(async (req, res) => {
  const data = await matchs.deleteOne({ _id: req.params.matchId });
  if (data.deletedCount !== 0) {
    res.json({ status: SUCCESS, data: null });
  } else {
    res.status(404).json({ status: FAIL, data: { match: "match not found" } });
  }
});

module.exports = {
  getAllMatchs,
  deleteMatch,
  updateMatch,
  addMatch,
  getMatchById,
};
