const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/otpModel");

const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password, otp} = req.body;
  console.log(name, email, password, otp);
  if (!name || !email || !password || !otp) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({email});
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  const response = await OTP.find({email}).sort({createdAt: -1}).limit(1);
  if (response.length === 0 || otp !== response[0].otp) {
    res.status(400);
    throw new Error("The otp is not valid");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({name, email, password: hashedPassword});
  if (user) {
    res.status(201).json({id: user.id, email: user.email});
  } else {
    res.status(400);
    throw new Error("User is not valid");
  }
  res.json({message: "Register the user"});
});

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({email});
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          name: user.name,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "1d"}
    );
    res.json({accessToken});
  } else {
    res.status(401);
    throw new Error("The password is not valid");
  }
});
module.exports = {registerUser, loginUser};
