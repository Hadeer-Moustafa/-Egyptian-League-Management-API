const User = require("../models/user");
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpstatus");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const generate_jwt = require("../utilities/generate_jwt");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utilities/appError");

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
  const { firstName, lastName, email, password,role } = req.body;
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
    role
  });
  const token = await generate_jwt({ id: newUser._id, email: newUser.email,role:newUser.role });
  newUser.token = token;
  await newUser.save();
  res.status(201).json({ status: SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw AppError.create("email and password are rquired", 404, "Fail");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw AppError.create("user not found", 404, "Fail");
  }
  const matchedPassword = await bycrypt.compare(password, user.password);
  if (user && matchedPassword) {
    const token = await generate_jwt({ id: user._id, email: user.email,role:user.role });
    return res.json({ status: SUCCESS, data: { token } });
  }
  throw AppError.create("error in email or password", 404, "Error");
});

module.exports = {
  getAllUsers,
  register,
  login,
};
