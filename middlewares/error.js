// it return error in json format
exports.generatedErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key")
  ) {
    err.message = "User With This Email Already Exists!";
  }

  res.status(statusCode).json({
    message: err.message,
    success: err.success,
    errName: err.name,
    stack: err.stack,
  });
};
