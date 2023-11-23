const mongoose = require("mongoose");

const snappSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, default: null },
    data: [{ type: Object, default: null }],
    snapp_image: { type: Object, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("snapp", snappSchema);
