const User = require("../../models/user.model");
const RoomChat = require("../../models/room-chat.model");
module.exports = async (res) => {
  _io.once("connection", (socket) => {
    //Server nhận data
    const myId = res.locals.user.id;

    // socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", myId)

    // socket.on('disconnect', () => {
    //   socket.broadcast.emit("SERVER_RETURN_USER_OFFLINE", myId)
    // });

    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const userRequested = await User.findOne({ _id: userId });
      if (!userRequested.accepts.includes(myId)) {
        const myUser = await User.findOneAndUpdate(
          { _id: myId },
          {
            $push: { requests: userId },
          }
        ).select("fullName avatar");
        await User.updateOne(
          { _id: userId },
          {
            $push: { accepts: myId },
          }
        );
        socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
          myId: userId,
          lengthAccept: userRequested.accepts.length + 1,
        });

        socket.broadcast.emit("SERVER_RETURN_INFOR_REQUESTED", {
          fullName: myUser.fullName,
          userId: myUser.id,
          avatar: myUser.avatar,
          myId: userId,
        });
      }
    });

    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const userRequested = await User.findOne({ _id: userId });
      if (userRequested.accepts.includes(myId)) {
        const myUser = await User.findOneAndUpdate(
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

        socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
          myId: userId,
          lengthAccept: userRequested.accepts.length - 1,
        });

        socket.broadcast.emit("SERVER_RETURN_INFOR_CANCEL_REQUESTED", {
          fullName: myUser.fullName,
          userId: myUser.id,
          avatar: myUser.avatar,
          myId: userId,
        });
      }
    });

    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      //khi đồng ý
      // - thêm vào list friend
      // - xóa accept của myid
      // - xóa request của userid
      const newRoomChat = new RoomChat({
        type: "friend",
        users: [
          {
            user_id: myId,
            role: "admin",
          },
          {
            user_id: userId,
            role: "admin",
          },
        ],
      });
      await newRoomChat.save();

      const myUser = await User.findByIdAndUpdate(
        { _id: myId },
        {
          $push: { friends: { user_id: userId, room_chat_id: newRoomChat.id } },
          $pull: { accepts: userId },
        },
        { new: true }
      );
      await User.updateOne(
        { _id: userId },
        {
          $push: { friends: { user_id: myId, room_chat_id: newRoomChat.id } },
          $pull: { requests: myId },
        }
      );

      socket.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        myId: myId,
        lengthAccept: myUser.accepts.length,
      });
    });

    socket.on("CLIENT_DISAGREE_FRIEND", async (userId) => {
      const myUser = await User.findByIdAndUpdate(
        { _id: myId },
        { $pull: { accepts: userId } },
        { new: true }
      );
      await User.updateOne({ _id: userId }, { $pull: { requests: myId } });

      socket.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        myId: myId,
        lengthAccept: myUser.accepts.length,
      });
    });
    socket.on("CLIENT_SEND_REMOVE_FRIEND", async (userId) => {
      //pull id ra khỏi list friend
      await User.updateOne(
        { _id: myId },
        {
          $pull: { friends: { user_id: userId } },
        }
      );
      await User.updateOne(
        { _id: userId },
        {
          $pull: { friends: { user_id: myId } },
        }
      );
      socket.broadcast.emit("SERVER_RETURN_REMOVE_FRIEND", {
        myId: userId,
        userId: myId,
      });
    });
  });
};
