const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")
//[GET] /cart
module.exports.index = async (req, res) => {
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (message) => {
      //Lưu vào DB
      const user = res.locals.user
      const chat = new Chat({
        content: message,
        user_id: user.id
      })
      
      await chat.save();
    })
  });

  const chats = await Chat.find({deleted: false});
  for (const item of chats) {
    const inforUser = await User.findOne({_id: item.user_id}).select("fullName")
    item.inforUser = inforUser
  }

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats
  });
};