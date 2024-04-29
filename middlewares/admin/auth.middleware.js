const Account = require("../../models/account.model")
const Role = require('../../models/role.model')
const systemConfig = require("../../config/system")
module.exports.authRequire = async (req, res, next) => {
  const token = req.cookies.token;
  if(token) {
    const user = await Account.findOne({token: token, status: "active", deleted: false}).select("-password")
    if(user) {
      const role = await Role.findOne({_id: user.role_id}).select("title permissions")
      res.locals.user = user
      res.locals.role = role
      next();
    }else {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
  }else {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
  }
};
