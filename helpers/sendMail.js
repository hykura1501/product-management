const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
// const dotenv = require('dotenv');
// dotenv.config();
module.exports.sendMail = (email, subject, html) => {

  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.USER_PASS,
      },
    })
  );

  const mailOptions = {
    from: process.env.USER_GMAIL,
    to: email,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
    //   console.log("Email sent: " + info.response);
    }
  });
};
