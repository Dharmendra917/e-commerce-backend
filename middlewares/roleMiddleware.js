const userModel = require("../models/userSchema.js");
const ErrorHandler = require("../utils/ErrorHandler");

const roleMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    if (!req.user) {
      console.log(req.employeeid, "user object _id missing");
      return next(new ErrorHandler("Error in user id", 500, false));
    }
    console.log(allowedRoles);
    const user = await userModel.findById(req.user);
    if (!user) {
      console.log("Employee not found in role middleware:", user);
      return res
        .status(403)
        .json({ message: "Access denied. No role provided." });
    }

    // // // Check if the user's role is in the allowed roles
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
    next();
  };
};

module.exports = roleMiddleware;
