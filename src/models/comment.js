const { boolean } = require("joi");
const mongoose = require("mongoose");

const commentModel = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "Users" },
    fromId: { type: mongoose.Types.ObjectId },
    isVacationId: { type: Boolean },
    isPostId: { type: Boolean },
    comment: { type: String, required: true },
    from: { type: String },
    replies: [
      {
        rid: { type: mongoose.Schema.Types.ObjectId },
        userId: { type: mongoose.Types.ObjectId, ref: "Users" },
        from: { type: String },
        replyAt: { type: String },
        comment: { type: String },
        created_At: { type: Date, default: Date.now() },
        updated_At: { type: Date, default: Date.now() },
        likes: [{ type: mongoose.Types.ObjectId }],
      },
    ],
    likes: [{ type: mongoose.Types.ObjectId }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", commentModel);
