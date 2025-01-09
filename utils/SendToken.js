const ErrorHandler = require("./ErrorHandler.js");

exports.SendToken = (user, role, statuscode, res) => {
  const token = user.getJwtToken();
  if (!token) next(new ErrorHandler("Sign in First!", 500, false));

  const option = {
    // expires: new Date(
    //   Date.now() + process.env.COOKIE_EXIPRES * 24 * 60 * 60 * 1000
    // ),
    httpOnly: true,
    secure: true,
  };
  res.cookie(`${role}`, token, option);
  res.status(statuscode).json({ success: true, id: user._id, token });
};
