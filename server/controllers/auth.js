const crypto = require("crypto");

const User = require("../models/User.js");

exports.register = async (req, res, next) => {
  //   res.send("Register");
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  // res.send("Login");
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ success: false, error: "Enter email and password" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({ success: false, error: "Invalid password" });
    }

    const isMatched = await user.matchPasswords(password);

    if (!isMatched) {
      res.status(404).json({ success: false, error: "Invalid password" });
    }

    res.status(200).json({
      success: true,
      token: "yaudjdjddhink",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password");
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset Password");
};
