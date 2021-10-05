const Errors = require("http-errors");
const { UserModel } = require("../models");
const token = require("../utils");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    throw new Errors.Conflict("Already account exist");
  }

  const newUser = new UserModel({ email });
  newUser.setPass(password);
  const userToken = token.get(newUser.email);
  newUser.setToken(userToken);
  await newUser.save();

  res.status(201).json({
    message: "user created",
    token: userToken,
    user: {
      email: newUser.email,
      id: newUser._id,
    },
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

  const userToken = token.get(user.email);
  await UserModel.findByIdAndUpdate(user._id, { token: userToken });

  res.status(200).json({
    token: userToken,
    user: {
      email: user.email,
      id: user._id,
    },
  });
};

const logout = async (req, res) => {
  //user id
  await UserModel.findByIdAndUpdate(user._id, { token: "" });
  token.clear();
  res.json("ok");
};

module.exports = { signup, login, logout };
