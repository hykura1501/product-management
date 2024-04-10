const mongoose = require("mongoose");
require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect Success");
  } catch (error) {
    console.log("Connect Error");
    console.log(error);
  }
};
