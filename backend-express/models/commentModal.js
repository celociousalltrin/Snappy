const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, default: null },
    snapp_id: { type: mongoose.Types.ObjectId, default: null },
    comment: { type: String, default: null },
    replies: [
      {
        reply_user_id: { type: mongoose.Types.ObjectId, default: null },
        reply_comment: { type: String, default: null },
        replied_at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
