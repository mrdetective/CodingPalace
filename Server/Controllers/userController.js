const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({email});
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
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
    res.json({message: "Successfully logged in!"});
  } else {
    res.status(401);
    throw new Error("The password is not valid");
  }
});
module.exports = {registerUser, loginUser};
