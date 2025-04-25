const EmailUser = require("../models/EmailUser");

const saveEmailUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    let user = await EmailUser.findOne({ email });
    if (!user) {
      user = new EmailUser({ email, password });
      await user.save();
    } else {
      return res.status(400).json({ error: "User already exists" });
    }
    res.status(200).json({ message: "User saved successfully", user });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { saveEmailUser };