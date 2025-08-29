const matchs = require("../models/teams&matchs").Match;
const e = require("express");
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpstatus");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utilities/appError");

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
    return res.json({ status: SUCCESS, data: { match: data } });
  }
  throw AppError.create("match not found", 404, "Fail");
});

const addMatch = asyncWrapper(async (req, res) => {
  const newMatch = new matchs(req.body);
  await newMatch.save().then((data) => {
    res.status(201).json({ status: SUCCESS, data: { match: data } });
  });
});

const updateMatch = asyncWrapper(async (req, res) => {
 if(Object.keys(req.body).length===0){
    throw AppError.create("no data provided to update", 400, "Fail");
 }
  const data = await matchs.updateOne(
    { _id: req.params.matchId },
    { $set: req.body }
  );

  if (data.matchedCount !== 0) {
    return res.json({ status: SUCCESS, data: data });
  }
  throw AppError.create("match not found", 404, "Fail");
});

const deleteMatch = asyncWrapper(async (req, res) => {
  const data = await matchs.deleteOne({ _id: req.params.matchId });
  if (data.deletedCount !== 0) {
    return res.json({ status: SUCCESS, data: null });
  }
  throw AppError.create("match not found", 404, "Fail");
});

module.exports = {
  getAllMatchs,
  deleteMatch,
  updateMatch,
  addMatch,
  getMatchById,
};
