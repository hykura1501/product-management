const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
      type: String,
      default: generate.String(20),
    },
    friends: [
      {
        user_id: String,
        room_chat_id: String,
      }
    ],
    requests: Array,
    accepts: Array,
    avatar: String,
    phone: String,
    status: {
      type: String,
      default: "active",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
