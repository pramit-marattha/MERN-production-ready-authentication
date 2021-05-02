const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotpassword,
  resetpassword,
} = require("../controllers/auth.js");

// setting up register route
router.route("/register").post(register);
// login route
router.route("/login").post(login);
// forgot password route
router.route("/forgot-password").post(forgotpassword);
// reset password route
router.route("/reset-password/:resetToken").put(resetpassword);

module.exports = router;
