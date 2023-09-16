const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    is_status_changed: {
      type: Boolean,
      default: false,
    },
    is_cancel: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("friend", friendSchema);
