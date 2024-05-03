const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  const token = req.cookies.token;
  if(token) {
    const user = await Account.findOne({token: token, status: "active", deleted: false}).select("-password")
    if(user) {
      res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    }else {
      res.clearCookie("token");
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
  }else {
    res.render("admin/pages/auth/login", {
      pageTitle: "Đăng nhập"
    });
  }
};

// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("token")
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
};

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await Account.findOne({
    email: email,
    deleted: false
  })

  if(!user) {
    req.flash("error", "Email không tồn tại!")
    res.redirect("back");
    return;
  }

  if(md5(password) !== user.password) {
    req.flash("error", "Mật khẩu không đúng!")
    res.redirect("back");
    return;
  }

  if(user.status === "inactive") {
    req.flash("error", "Tài khoản đã bị khóa!")
    res.redirect("back");
    return;
  }
  res.cookie("token", user.token)
  req.flash("success", "Đăng nhập thành công!")
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
};