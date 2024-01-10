const mongoose = require("mongoose");

const postModel = new mongoose.Schema(
  {
    postBy: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    // vacation: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Vacations",
    //   required: true,
    // },
    milestone: {
      type: mongoose.Types.ObjectId,
      ref: "Milestones",
      required: true,
    },
    content: { type: String },
    images: { type: String },
    // milestones: { type: Date },
    likes: [{type: mongoose.Types.ObjectId, ref: "Users"}],
    comments: [{type: mongoose.Types.ObjectId, ref: "Comments"}],
    // privacy: {
    //   type: String,
    //   enum: ["onlyMe", "allowedUsers", "public"],
    //   default: "public",
    // },
    // allowedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postModel);
