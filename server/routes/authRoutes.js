const express = require("express");
const { saveGoogleId } = require("../controllers/googleAuthController");
const { saveEmailUser } = require("../controllers/emailAuthController");

const router = express.Router();

// Google Authentication Route
router.post("/save-google-id", saveGoogleId);

// Email Authentication Route
router.post("/save-email-user", saveEmailUser);

module.exports = router;