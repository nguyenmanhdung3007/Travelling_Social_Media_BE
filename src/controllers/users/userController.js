const { User } = require("../../models/user");
const { Token } = require("../../models/token");
const { createJwtToken } = require("../../util/auth");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const SendEmail = require("../../util/sendEmail");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// register - dang ki
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(403)
      .json({ msg: "Invalid input, please check your data" });
  }
  console.log(req.body);
  const { fullName, email, userName, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    console.errors(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
  if (user) {
    return res.status(200).json({
      status: "fail",
      msg: "User already exists, please login instead.",
    });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12); // ma hoa mat khau
  } catch (err) {
    console.errors(err.message);
    res.status(500).send({ msg: "Server Error" });
  }

  user = new User({
    fullName,
    email,
    userName,
    password: hashedPassword,
  });
  try {
    await user.save().then((doc) => {
      const token = createJwtToken(doc._id);
      res.json({ status: "true", msg: "Register Successfully", token: token });
    });
  } catch (err) {
    console.log(err);
  }
};

// login - dang nhap
exports.login = async (req, res, next) => {
  if (!req.headers.authorization) {
    const { email, password } = req.body;

    let staff;
    try {
      staff = await User.findOne({ email: email });
    } catch (error) {
      console.log(error);
    }
    if (!staff) {
      return res.json({ status: "fail", msg: "email not found" });
    }

    let check = false;
    try {
      check = await bcrypt.compare(password, staff.password);
    } catch (err) {
      console.log(err);
    }
    if (!check) {
      return res.json({ status: "fail", msg: "Password is not match!" });
    }

    const token = createJwtToken(staff._id);
    return res.json({
      status: "success",
      msg: "login successfully",
      token: token,
      data: staff,
    });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decodedToken) {
        if (err) {
          return res.json({ status: "fail", msg: "Invalid token" });
        }
        User.findOne({ _id: decodedToken.userID }, (err, doc) => {
          if (err) {
            return res.json({ status: "fail", msg: "server error" });
          } else if (doc) {
            return res.json({
              status: "success",
              msg: "login successfully!",
              token: token,
              data: doc,
            });
          }
        });
      });
    }
  }
};

// forget password - quen mat khau
exports.forgetPass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(200)
      .json({ msg: "Invalid input, please check your data" });
  }
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user)
    return res.status(200).json({ status: "fail", msg: "Email not found" });
  const n = crypto.randomInt(100000, 999999);
  console.log(n);
  const newpass = await bcrypt.hash(n.toString(), 12);
  await SendEmail(user.email, "Hello User", n);
  await User.findOneAndUpdate(
    { email: user.email },
    { password: newpass },
    { new: true }
  ).then((doc) => {
    res.json({ status: true, msg: "Check your email to receive new code" });
  });
};

// change password - thay doi mat khau
exports.userChangePass = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findOne({ _id: userID });

    if (!user) {
      return res.json({ status: "fail", msg: "user not found!" });
    }

    const { oldPassword, newPassword } = req.body;

    if (oldPassword && newPassword) {
      const check = await bcrypt.compare(oldPassword, user.password);

      if (!check) {
        return res.json({ status: "fail", msg: "Old password is not match" });
      } else {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const updatedUser = await User.findOneAndUpdate(
          { _id: userID },
          { password: hashedPassword },
          { new: true }
        );

        return res.json({
          status: "success",
          msg: "password has changed",
          info: updatedUser,
        });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "fail", msg: "Server Error" });
  }
};
