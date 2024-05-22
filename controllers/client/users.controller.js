const User = require("../../models/user.model");
const usersSocket = require("../../socket/client/users.socket");
//[GET] /users/list-users
module.exports.listUsers = async (req, res) => {
  usersSocket(res);

  const myId = res.locals.user.id;

  const listUsers = await User.find({
    deleted: false,
    status: "active",
    _id: { $ne: myId },
  }).select("fullName avatar requests");

  //filter user

  const myUser = await User.findOne({ _id: myId });
  const friends = myUser.friends.map((item) => {
    return item.user_id;
  });
  const newUsers = listUsers.filter((item) => {
    return !(
      myUser.requests.includes(item.id) ||
      myUser.accepts.includes(item.id) ||
      friends.includes(item.id)
    );
  });

  res.render("client/pages/users/list-users.pug", {
    pageTitle: "Danh sách người dùng",
    listUsers: newUsers,
  });
};

//[GET] /users/friends
module.exports.friends = async (req, res) => {
  usersSocket(res);
  const myId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: myId,
    deleted: false,
    status: "active",
  });
  const friends = myUser.friends.map(item => {
    return item.user_id
  })
  const myFriends = await User.find({
    _id: { $in: friends },
    deleted: false,
    status: "active",
  }).select("fullName avatar statusOnline");
  // console.log(myFriends);
  res.render("client/pages/users/friends", {
    pageTitle: "Danh sách bạn bè",
    listUsers: myFriends,
  });
};
//[GET] /users/requests
module.exports.requests = async (req, res) => {
  usersSocket(res);

  const myId = res.locals.user.id;
  const myUser = await User.findOne({ _id: myId });

  const users = await User.find({
    _id: { $in: myUser.requests },
    deleted: false,
    status: "active",
  });

  res.render("client/pages/users/requests.pug", {
    pageTitle: "Lời mời đã gửi",
    listUsers: users,
  });
};
//[GET] /users/accepts
module.exports.accepts = async (req, res) => {
  usersSocket(res);

  const myId = res.locals.user.id;
  const myUser = await User.findOne({ _id: myId });

  const users = await User.find({
    _id: { $in: myUser.accepts },
    deleted: false,
    status: "active",
  });
  res.render("client/pages/users/accepts.pug", {
    pageTitle: "Lời mời kết bạn",
    listUsers: users,
  });
};
