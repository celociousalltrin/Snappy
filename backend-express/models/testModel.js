const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("test", testSchema);
