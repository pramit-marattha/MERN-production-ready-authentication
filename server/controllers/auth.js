const crypto = require("crypto");

const User = require("../models/User.js");
const ErrorHandler = require("../utils/errorHandler.js");
const sendEmail = require("../utils/sendEmail.js");

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

exports.forgotpassword = async (req, res, next) => {
  // res.send("Forgot Password");
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Email failed to sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.RESET_URL_LINK}/password-reset/${resetToken}`;

    const message = `
  <table cellspacing="0" border="0" cellpadding="0" width="100%" height:"100%" style="@import url(https://fonts.googleapis.com/css?family=poppins:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
    <tr>
      <td>
        <table style="background-color: white; max-width:100vh;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td style="height:80px;">&nbsp;</td>
          </tr>
          <tr>
            <td style="text-align:center;">
            </td>
          </tr>
          <tr>
            <td style="height:20px;">&nbsp;</td>
          </tr>
          <tr>
            <td>
              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:25px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(100,100,100,.16);box-shadow:0 6px 18px 0 rgba(100,100,100,1);">
                <tr>
                  <td style="height:40px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:0 35px;">
                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'poppins',sans-serif;">You have
                      requested to reset your password</h1>
                    <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                      To reset your password, click the
                      following link and follow the guidelines.
                    </p>
                    <button href="${resetUrl}" clicktracking=off style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                      Password</button>
                      <p>If the button is not working click here <a href="${resetUrl}" clicktracking=off>${resetUrl}</a></p>
                      
                  </td>
                </tr>
                <tr>
                  <td style="height:40px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          <tr>
            <td style="height:20px;">&nbsp;</td>
          </tr>
          <tr>
      
          </tr>
        </table>
      </td>
    </tr>
  </table>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorHandler("Email failed to send", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset Password");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
