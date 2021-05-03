const crypto = require("crypto");

const User = require("../models/User.js");
const ErrorHandler = require("../utils/errorHandler.js");

exports.register = async (req, res, next) => {
  //   res.send("Register");
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    // res.status(201).json({
    //   success: true,
    //   token: "ddjsjsjs",
    // });
    sendToken(user, 201, res);
  } catch (error) {
    // console.error(error);
    // res.status(500).json({
    //   success: false,
    //   error: error.message,
    // });
    next(error);
  }
};

exports.login = async (req, res, next) => {
  // res.send("Login");
  const { email, password } = req.body;
  if (!email || !password) {
    // res.status(400).json({ success: false, error: "Enter email and password" });
    return next(new ErrorHandler("Enter email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // res.status(404).json({ success: false, error: "Invalid password" });
      return next(new ErrorHandler("Incorrect password"), 401);
    }

    const isMatched = await user.matchPasswords(password);

    if (!isMatched) {
      return next(new ErrorHandler("Invalid password", 401));
      // res.status(404).json({ success: false, error: "Invalid password" });
    }

    // res.status(200).json({
    //   success: true,
    //   token: "yaudjdjddhink",
    // });
    sendToken(user, 200, res);
  } catch (error) {
    // res.status(500).json({ success: false, error: error.message });
    next(error);
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password");
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset Password");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
