const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  provider: { type: String, enum: ["google", "email"], default: "email" },
});

userSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = bcryptjs.genSaltSync(10);
  this.password = bcryptjs.hashSync(this.password, salt);
});

userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

module.exports = mongoose.model("User", userSchema);
