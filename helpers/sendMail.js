const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
module.exports.sendMail = (email, subject, html) => {

  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "voho39850@gmail.com",
        pass: "odapklgpshjsatnl",
      },
    })
  );

  const mailOptions = {
    from: "somerealemail@gmail.com",
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
