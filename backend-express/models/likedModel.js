const mongoose = require("mongoose");

const likedSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, default: null },
    snapp_id: { type: mongoose.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("like", likedSchema);
