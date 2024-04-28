const Account = require("../../models/account.model")
const systemConfig = require("../../config/system")
module.exports.authRequire = async (req, res, next) => {
  const token = req.cookies.token;
  if(token) {
    const user = await Account.findOne({token: token})
    if(user) {
      next();
    }else {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
  }else {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
  }
};
