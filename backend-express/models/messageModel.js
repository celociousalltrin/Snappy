const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    ids: [{ type: mongoose.Types.ObjectId, default: null }],
    conversation: [
      {
        from: { type: mongoose.Types.ObjectId, default: null },
        is_read: { type: Boolean, default: false },
        message: { type: String, default: null },
        messaged_at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
