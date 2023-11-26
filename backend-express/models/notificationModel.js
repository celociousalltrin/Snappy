const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    from_id: { type: mongoose.Types.ObjectId, default: null },
    to_id: { type: mongoose.Types.ObjectId, default: null },
    notify_type: { type: Number, default: 0 },
    is_feed_notifiy: { type: Boolean, default: false },
    is_connection_notify: { type: Boolean, default: false },
    is_read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("noitification", notificationSchema);
