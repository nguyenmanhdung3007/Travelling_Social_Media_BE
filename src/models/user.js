const { string } = require("joi");
const mongoose = require("mongoose");

const basicInfo = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String },
  cover: {type: String},
  dateOfBirth: { type: Date },
  age: { type: Number },
  gender: { type: String },
  vacations: {
    inProgess: [{type: String}],
    finished: [{type: String}],
    intention: [{type: String}],
  }


});

// basicInfo.pre("save", async function (next) {
//   try {
//     if (this.dateOfBirth && !this.age) {
//       const currentDate = new Date();
//       const birthDate = new Date(this.dateOfBirth);
//       const age = currentDate.getFullYear() - birthDate.getFullYear();

//       if (
//         currentDate.getMonth() < birthDate.getMonth() ||
//         (currentDate.getMonth() === birthDate.getMonth() &&
//           currentDate.getDate() < birthDate.getDate())
//       ) {
//         this.age = age - 1;
//       } else {
//         this.age = age;
//       }
//     }

//     console.log("Saving user with age:", this.age);
//     next();
//   } catch (error) {
//     console.error("Error in middleware:", error);
//     next(error);
//   }
// }
// );

const User = mongoose.model("Users", basicInfo);
module.exports = { User };
