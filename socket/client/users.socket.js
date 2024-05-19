const User = require("../../models/user.model");
module.exports = async (res) => {
  _io.once("connection", (socket) => {
    //Server nhận data
    const myId = res.locals.user.id;

    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const existRequest = await User.findOne({ _id: userId });
      if (!existRequest.accepts.includes(myId)) {
        await User.updateOne(
          { _id: myId },
          {
            $push: { requests: userId },
          }
        );
        await User.updateOne(
          { _id: userId },
          {
            $push: { accepts: myId },
          }
        );
        socket.broadcast.emit("SERVER_REQUEST_ADD", {
          myId: userId,
          userId: myId,
        });
      }
    });

    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      await User.updateOne(
        { _id: myId },
        {
          $pull: { requests: userId },
        }
      );
      await User.updateOne(
        { _id: userId },
        {
          $pull: { accepts: myId },
        }
      );
      socket.broadcast.emit("SERVER_REQUEST_CANCEL", {
        myId: userId,
        userId: myId,
      });
    });

    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      //khi đồng ý
      // - thêm vào list friend
      // - xóa accept của myid
      // - xóa request của userid
      await User.updateOne(
        { _id: myId },
        { $push: { friends: { user_id: userId } } }
      );
      await User.updateOne(
        { _id: userId },
        { $push: { friends: { user_id: myId } } }
      );
      await User.updateOne({ _id: myId }, { $pull: { accepts: userId } });
      await User.updateOne({ _id: userId }, { $pull: { requests: myId } });
    });

    socket.on("CLIENT_DISAGREE_FRIEND", async (userId) => {
      await User.updateOne({ _id: myId }, { $pull: { accepts: userId } });
      await User.updateOne({ _id: userId }, { $pull: { requests: myId } });
    });
  });
};
