const mongoose = require("mongoose");

const postModel = new mongoose.Schema(
  {
    postBy: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    milestone: {
      type: mongoose.Types.ObjectId,
      ref: "Milestones",
      required: true,
    },
    content: { type: String },
    images: { type: String },
    likes: [{type: String}],
    comments: [{type: mongoose.Types.ObjectId, ref: "Comments"}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postModel);
