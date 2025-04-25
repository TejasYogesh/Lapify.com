const User = require("../models/User");

const saveGoogleId = async (req, res) => {
  const { googleId, name, email } = req.body;

  if (!googleId) {
    return res.status(400).json({ error: "Google ID is required" });
  }

  try {
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ googleId, name, email });
      await user.save();
    }
    res.status(200).json({ message: "Google ID saved successfully", user });
  } catch (error) {
    console.error("Error saving Google ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { saveGoogleId };