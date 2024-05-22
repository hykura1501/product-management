const Chat = require("../../models/chat.model");
const RoomChat = require("../../models/room-chat.model");
const User = require("../../models/user.model");
const chatSocket = require("../../socket/client/chat.socket");
//[GET] /chat
module.exports.index = async (req, res) => {
  // chatSocket(res);
  const myId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: myId,
    status: "active",
    deleted: false,
  });

  if (myUser.friends.length > 0) {
    res.redirect(`/chat/${myUser.friends[0].room_chat_id}`);
  } else {
    res.render("client/pages/chat/index", {
      pageTitle: "Chat",
      notFriend: true,
    });
  }
};

//[GET] /:roomChatId
module.exports.roomChat = async (req, res) => {
  //Chat single
  const myId = res.locals.user.id;
  const roomChatId = req.params.roomChatId;
  chatSocket(res, roomChatId);
  const roomChat = await RoomChat.findOne({ _id: roomChatId, deleted: false });
  const chats = await Chat.find({ room_chat_id: roomChatId, deleted: false });
  if(roomChat.type === "friend") {
    const userId = roomChat.users.find((user) => user.user_id !== myId).user_id;
    const user = await User.findOne({ _id: userId, status: "active", deleted: false }).select("fullName avatar");
    chats.inforUser = user
  }else if(roomChat.type === "group") {
    chats.inforUser = {
      
    }
    chats.inforUser.fullName = roomChat.title
  }
  const myUser = await User.findOne({
    _id: myId,
    status: "active",
    deleted: false,
  });

  const myFriends = myUser.friends;

  //chat group

  const groups = await RoomChat.find({deleted: false,
    "users.user_id": myId,
    type: "group"
  })

  // console.log();

  for (const friend of myFriends) {
    const inforUser = await User.findOne({
      _id: friend.user_id,
      status: "active",
      deleted: false,
    }).select("fullName avatar statusOnline");
    friend.inforUser = inforUser;
  }

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats,
    myFriends: myFriends,
    groups: groups
  });
};


//[POST] /create-group-chat
module.exports.createGroupChat = async (req, res) => {
  const myId = res.locals.user.id;
  let users = []
  if(!Array.isArray(req.body.users)) {
    users.push(req.body.users)
  }else {
    users = req.body.users
  }
  let newUsers = [
    {
      user_id: myId,
      role: "admin"
    }
  ]
  let title = ""
  for(const user of users) {
    const inforUser = await User.findOne({_id: user}).select("fullName")
    newUsers.push({
      user_id: user,
      role: "user"
    })
    title += inforUser.fullName + ", "
  }
  const newRoomChat = new RoomChat({
    title: req.body.title || title,
    users: newUsers,
    avatar: req.body.avatar || "",
    type: "group"
  })
  await newRoomChat.save();
  res.redirect("back")
};