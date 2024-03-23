const mongoose = require("mongoose");

const connectDB = (url) => {
  console.log("connected to database");
  return mongoose.connect(url);
};

module.exports = connectDB;
