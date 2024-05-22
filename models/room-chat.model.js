const mongoose = require("mongoose");
const roomChatSchema = new mongoose.Schema({
  title: String,
  avatar: String,
  type: String,
  status: String,
  users: [
    {
      user_id: String,
      role: String,
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
  deleteAt: Date,
});

const RoomChat = mongoose.model("RoomChat", roomChatSchema, "rooms-chat");
module.exports = RoomChat;
