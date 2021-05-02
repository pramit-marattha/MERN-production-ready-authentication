const crypto = require("crypto");

exports.register = (req, res, next) => {
  res.send("Register");
};

exports.login = (req, res, next) => {
  res.send("Login");
};

exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password");
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset Password");
};
