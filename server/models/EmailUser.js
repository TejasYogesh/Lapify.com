const mongoose = require("mongoose");

const emailUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const EmailUser = mongoose.model("emailusers", emailUserSchema);

module.exports = EmailUser;