const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  user_name: { type: String, default: null, unique: true },
  email: { type: String, default: null, unique: true },
  dob: { type: Date, default: null },
  phone_number: { type: String, default: null },
  personal_address: {
    state: { type: String, default: null },
    country: { type: String, default: null },
  },
  password: { type: String, default: null },
  user_image: { type: Object, default: null },
  about: [{ type: Object, default: null }],
  interest: [{ type: Number, default: null }],
  is_external_authenticated_user: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userSchema);
