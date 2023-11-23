const mongoose = require("mongoose");

const connectorSchema = new mongoose.Schema(
  {
    alliance_id: { type: mongoose.Types.ObjectId, default: null },
    fan_id: { type: mongoose.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("connector", connectorSchema);
