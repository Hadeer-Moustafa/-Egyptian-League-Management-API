const User = require("../models/user");
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpstatus");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const generate_jwt = require("../utilities/generate_jwt");
const asyncWrapper = require("../middleware/asyncWrapper");

dotenv.config();
const getAllUsers = asyncWrapper(async (req, res) => {
  const quary = req.query;
  const limit = quary.limit || 6;
  const page = quary.page || 1;
  const skip = (page - 1) * limit;
  const data = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);

  res.json({ status: SUCCESS, data: { users: data } });
});

const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const olduser = await User.findOne({ email: req.body.email });
  if (olduser) {
    return res
      .status(400)
      .json({ status: FAIL, message: "user already exist." });
  }
  const hashedpassword = await bycrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedpassword,
  });
  const token = await generate_jwt({ id: newUser._id, email: newUser.email });
  newUser.token = token;
  await newUser.save();
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new Error("email and password required");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("user not found");
  }
  const matchedPassword = await bycrypt.compare(password, user.password);
  if (user && matchedPassword) {
    const token = await generate_jwt({ id: user._id, email: user.email });
    res.json({ status: SUCCESS, data: { token } });
  } else {
    throw new Error("error in email or password");
  }
});

module.exports = {
  getAllUsers,
  register,
  login,
};
