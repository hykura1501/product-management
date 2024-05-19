const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const chatSocket = require('../../socket/client/chat.socket')
//[GET] /chat
module.exports.index = async (req, res) => {
  
  chatSocket(res)

  const chats = await Chat.find({ deleted: false });
  for (const item of chats) {
    const inforUser = await User.findOne({ _id: item.user_id }).select(
      "fullName"
    );
    item.inforUser = inforUser;
  }

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};
