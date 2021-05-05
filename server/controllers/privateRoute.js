exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "REEEE!! Congratulation! You have successfully logged in",
  });
};
