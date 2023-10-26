const otpGenerator = require("otp-generator");
const OTP = require("../models/otpModel");
const User = require("../models/userModel");

const sendOTP = async (req, res) => {
  try {
    const {email} = req.body;
    const checkUserPresent = await User.findOne({email});
    if (checkUserPresent) {
      return res.status(401).json({
        message: "User already registered",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({otp: otp});
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({otp: otp});
    }
    const otpPayload = {email, otp};
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      message: "OTP sent Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

module.exports = sendOTP;
