const Errors = require("http-errors");
const { UserModel } = require("../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    throw new Errors.Conflict("Already account exist");
  }

  const newUser = new UserModel({ email });
  newUser.set(password);
  await newUser.save();

  res.status(201).json({
    message: "user created",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Errors.NotFound("Email is not found");
  }

  const isCorrectPass = user.isValid(password, user.password);

  if (!isCorrectPass) {
    throw new Errors.Unauthorized("Wrong password");
  }
  //вернуть токен
};

const logout = async () => {};

const current = async () => {};

module.exports = { signup, login, logout, current };
