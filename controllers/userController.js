const userModel = require("../models/userSchema.js");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors.js");
const { SendToken } = require("../utils/SendToken.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
// const { verifyGoogleToken } = require("../utils/googleAuth");

exports.test = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, message: "User Test API!" });
});

exports.signup = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) return next(new ErrorHandler("Enter Your Full Name", 404, false));
  if (!email)
    return next(new ErrorHandler("Enter Your Email Address", 404, false));
  if (!password)
    return next(new ErrorHandler("Enter Your Password", 404, false));
  const user = await userModel(req.body).save();
  SendToken(user, "user", 200, res);
});

exports.signin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email)
    return next(new ErrorHandler("Enter Your Email Address", 404, false));
  if (!password)
    return next(new ErrorHandler("Enter Your Password", 404, false));

  const user = await userModel.findOne({ email }).select("+password").exec();
  if (!user) return next(new ErrorHandler("User Not Found!", 500, false));
  // check password
  const isMatch = await user.comparePassword(password);
  console.log(isMatch);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Password!", 500, false));

  // send token
  SendToken(user, "user", 200, res);
});

exports.current = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user).exec();
  if (!user) return next(new ErrorHandler("User Not Found!", 500, false));
  res.status(200).json({
    success: true,
    user,
  });
});

exports.signout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("user");
  res.status(200).json({ success: true, message: "Signout Successfully!" });
});

exports.googleAuth = async (req, res) => {
  const { tokenId } = req.body;
  try {
    const { email, name } = await verifyGoogleToken(tokenId);
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, provider: "google" });
    }
    const token = generateToken({ id: user._id, role: user.role });
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: "Google authentication failed" });
  }
};
