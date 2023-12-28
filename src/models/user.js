const mongoose = require("mongoose");

const basicInfo = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  gender: { type: String, required: true},
});

const userInfo = new mongoose.Schema({
  fullName: { type: String, required: true},
  avatar: { type: String, required: true },
  gender: { type: String, required: true},
})

const User = mongoose.model("Users", basicInfo);
const UserInfo = mongoose.model("UsersInfo", userInfo);
module.exports = { User, userInfo };
