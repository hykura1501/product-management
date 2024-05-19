const Chat = require("../../models/chat.model");
const uploadHelper = require("../../helpers/uploadCloud");
module.exports = (res) => {
  _io.once("connection", (socket) => {
    //Server nhận data
    const user = res.locals.user;
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      let images = [];
      for (const image of data.images) {
        const url = await uploadHelper.upload(image);
        images.push(url);
      }
      // Lưu vào DB
      const chat = new Chat({
        content: data.message,
        user_id: user.id,
        images: images,
      });

      await chat.save();

      //Server trả data về cho client
      _io.emit("SERVER_RETURN_DATA", {
        userId: user.id,
        fullName: user.fullName,
        content: data.message,
        images: images,
      });
    });

    socket.on("CLIENT_SHOWN_TYPING", (value) => {
      socket.broadcast.emit("SERVER_SHOWN_TYPING", {
        userId: user.id,
        fullName: user.fullName,
        value: value,
      });
    });
    socket.on("CLIENT_HIDDEN_TYPING", (value) => {
      socket.broadcast.emit("SERVER_HIDDEN_TYPING", {
        userId: user.id,
        value: value,
      });
    });
  });
};
