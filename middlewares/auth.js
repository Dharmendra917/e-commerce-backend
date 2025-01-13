const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { catchAsyncErrors } = require("./catchAsyncErrors.js");
const userModel = require("../models/userSchema.js");

exports.userIsAuth = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies[`user`] || req.headers[`authorization`];
  console.log(req.headers, "arhin hai kya?");
  if (!token) return next(new ErrorHandler("Please Sigin First!", 401, false));

  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(id).exec();
  if (!user)
    return next(new ErrorHandler("User Not Found With This Token", 500));

  req.user = id;
  next();
});
