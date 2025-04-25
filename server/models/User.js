const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String },
  email: { type: String },
});

const User = mongoose.model("usersgoogle", userSchema);

module.exports = User;