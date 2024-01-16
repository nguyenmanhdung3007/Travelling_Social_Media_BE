const mongoose = require("mongoose");

const vacationModel = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    title: { type: String },
    desc: { type: String },
    startedAt: { type: Date },
    endedAt: { type: Date },
    likes: [{type: String}],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comments" }],
    // userTags: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    // posts: [{ type: mongoose.Types.ObjectId, ref: "Posts" }],
    milestones: [{ type: mongoose.Types.ObjectId, ref: "Milestones" }],
    privacy: {
      type: String,
      enum: ["onlyMe", "onlyUserChoose", "public"],
      default: "public",
    },
    userChoose: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    status: {
      type: String,
      enum: ["Intention", "In Progress", "Finished"],
      default: "In Progress",
    },
    participants:[{type: mongoose.Types.ObjectId, ref: "Users"}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vacations", vacationModel);
