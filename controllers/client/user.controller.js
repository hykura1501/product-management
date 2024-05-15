const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const md5 = require("md5");
const generate = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
//[GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng kí tài khoản",
  });
};
//[POST] /user/register
module.exports.registerPost = async (req, res) => {
  try {
    const emailExist = await User.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (emailExist) {
      //alert
      return;
    }

    req.body.password = md5(req.body.password);

    const user = new User(req.body);

    await user.save();

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
//[GET] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập",
  });
};
//[GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};
//[POST] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email, deleted: false });
  if (!user) {
    //not exist email
    res.redirect("back");
    return;
  }

  if (user.password !== md5(password)) {
    //error password
    res.redirect("back");
    return;
  }

  if (user.status === "inactive") {
    //user inactive
    res.redirect("back");
    return;
  }

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};
//[GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Quên mật khẩu",
  });
};
//[POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  if (email) {
    try {
      const user = await User.findOne({ email: email, deleted: false });
      if (user) {
        //save otp to forgotPasswordSchema;
        const otp = generate.Number(6);
        const objForgotPassword = new ForgotPassword({
          email: email,
          otp: otp,
          expireAt: new Date(),
        });
        await objForgotPassword.save();
        //
        const subject = "Mã OTP lấy lại mật khẩu";
        const html = `Mã OTP để lấy lại mật khẩu của bạn là: <b>${otp}</b>. Vui lòng không cung cấp cho bất kỳ ai. Lưu ý mã này chỉ có thể sử dụng trong vòng 3 phút`;
        sendMailHelper.sendMail(email, subject, html);
        res.redirect(`/user/password/otp?email=${email}`);
      }else {
        res.redirect("back")
      }
    } catch (error) {
      console.log(error);
    }
  }
};

//[GET] /user/password/otp
module.exports.otp = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
};

//[POST] /user/password/otp
module.exports.otpPost = async (req, res) => {
  const { email, otp } = req.body;
  const forgotPass = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });
  if (!forgotPass) {
    res.redirect(`back`);
    return;
  }
  const user = await User.findOne({ email: email, deleted: false });
  if (user) {
    res.cookie("tokenUserForgot", user.tokenUser);
    res.redirect(`/user/password/reset`);
  }
};

//[GET] /user/password/reset
module.exports.reset = async (req, res) => {
  const tokenUserForgot = req.cookies.tokenUserForgot;
  const user = await User.findOne({ tokenUser: tokenUserForgot });
  res.render("client/pages/user/reset-password", {
    pageTitle: "Cập nhật mật khẩu",
    email: user.email,
  });
};

//[POST] /user/password/reset
module.exports.resetPost = async (req, res) => {
  const { password, passwordConfirm } = req.body;
  const tokenUserForgot = req.cookies.tokenUserForgot;
  if (!password) {
    res.redirect(`back`);
    return;
  }
  if (password !== passwordConfirm) {
    res.redirect(`back`);
    return;
  }
  await User.updateOne(
    { tokenUser: tokenUserForgot },
    { password: md5(password) }
  );
  res.cookie("tokenUser", tokenUserForgot);
  res.clearCookie("tokenUserForgot");
  res.redirect(`/`);
};
