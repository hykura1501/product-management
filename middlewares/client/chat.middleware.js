const User = require("../../models/user.model");
const RoomChat = require("../../models/room-chat.model");
module.exports.isAccess = async (req, res, next) => {
  const userId = res.locals.user.id;
  const roomChatId = req.params.roomChatId;

  try {
    const roomChat = await RoomChat.findOne({ _id: roomChatId });

    const ok = roomChat.users.some((item) => item.user_id === userId);
    if (ok) {
      next();
    } else {
      res.redirect("/users/friends");
    }
  } catch (error) {
    res.redirect("/users/friends");
  }
};
