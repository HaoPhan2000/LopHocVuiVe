const mongoose = require("mongoose");
require("dotenv").config();
async function connect() {
  try {
    await mongoose.connect((process.env.Mongodb_url),{});
    console.log("connect successfully");
  } catch (error) {
    console.log("connect failure");
  }
}
module.exports = { connect };
//mongodb://localhost:27017/QuanLyLopDayThem