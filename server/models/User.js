const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please insert user name"],
  },
  email: {
    type: String,
    required: [true, "Please insert email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please insert valid email",
    ],
  },
  passowrd: {
    type: String,
    required: [true, "Please insert password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPassowrdExpire: Date,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
