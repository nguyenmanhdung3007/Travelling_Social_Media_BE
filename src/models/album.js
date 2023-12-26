const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    title: { type: String },
    desc: { type: String },
    images: [{ type: String }],
    vacation: [{ type: mongoose.Types.ObjectId, ref: "Vacations" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comments" }],
    userTag: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    posts: [{ type: mongoose.Types.ObjectId, ref: "Posts" }],
    privacy: {
      type: String,
      enum: ["onlyMe", "allowedUsers", "public"],
      default: "public",
    },
    allowedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Albums", albumSchema);
