const mongoose = require("mongoose");

const mileStoneModel = new mongoose.Schema(
  {
    time: {type: Date},
    desc: {type: String},
    vacation: {
      type: mongoose.Types.ObjectId,
      ref: "Vacations",
      required: true,
    },
    posts: [{type: mongoose.Types.ObjectId, ref: "Posts",}]
  },
  { timestamp: true }
);

module.exports = mongoose.model("MileStones", mileStoneModel);
