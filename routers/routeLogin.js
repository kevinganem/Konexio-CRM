// EXPRESS - MONGOOSE
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
// AUTH
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// MODELS
const User = require("../models/userModel");
// SECRET
const secret = "5aJif0OZjepB63NRwyNSkk0czzttHKjXNQbEImrW";

// ROUTES
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, secret);

  res.cookie("jwt", token, { httpOnly: true, secure: false });

  res.json({
    message: "Here is your cookie",
  });
});

module.exports = router;
