const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  stadium: { type: String, required: true },
  founded: { type: String, required: true },
});
const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  date: { type: String, required: true },
  score: { type: Number, required: true },
});

const Team = mongoose.model("teams", teamSchema);
const Match = mongoose.model("matchs", matchSchema);

module.exports = {
  Team,
  Match,
};
