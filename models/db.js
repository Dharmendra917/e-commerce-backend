const mongoose = require("mongoose");

exports.connectDatabase = async () => {
  const uri = process.env.MONGODB_URL;
  try {
    const res = await mongoose.connect(uri);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

exports.disConnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database Disconnected");
  } catch (error) {
    console.log(error);
  }
};
