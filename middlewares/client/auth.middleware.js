const User = require("../../models/user.model")
module.exports.authRequire = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;
  if(tokenUser) {
    const user = await User.findOne({tokenUser: tokenUser, status: "active", deleted: false}).select("-password")
    if(user) {
      res.locals.user = user
      next();
    }else {
      res.redirect(`/user/login`)
    }
  }else {
    res.redirect(`/user/login`)
  }
};
