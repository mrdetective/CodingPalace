const express = require("express");
const otpController = require("../Controllers/otpController");
const router = express.Router();

router.post("/send-otp", otpController);

module.exports = router;
