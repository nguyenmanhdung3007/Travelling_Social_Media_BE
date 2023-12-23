const nodemailer = require("nodemailer");
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host:"stmp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "x20journey@gmail.com",
        pass: "aqucfwzwpkvomjma",
      },
    });

    await transporter.sendMail({
      from: "hello cu",
      to: email,
      subject: subject,
      text: "Your new password is : " + text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
module.exports = sendEmail;

