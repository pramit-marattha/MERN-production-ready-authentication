const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler.js");
const User = require("../models/User.js ");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("No user found with this id", 404));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorHandler("Not authorized to access this router", 401));
  }
};
