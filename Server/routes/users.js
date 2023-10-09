const user = require("../models/user");
const express = require("express");
const router = express.Router();
const {Magic} = require("@magic-sdk/admin");
const authMiddleware = require("..")