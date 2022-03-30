// EXPRESS - MONGOOSE
const express = require("express");
const router = express.Router();
// AUTH
const bcrypt = require("bcrypt");
// MODELS
const User = require("../models/userModel");

// ROUTES
router.post("/", async (req, res) => {
  if (req.body.password.length < 6 || !/\d/.test(req.body.password)) {
    return res.status(400).json({
      message: "Invalid data",
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  console.log(hashedPassword);

  try {
    await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
  } catch (err) {
    return res.status(400).json({
      message: "This account already exists",
    });
  }

  res.status(201).json({
    message: `User ${req.body.email} created`,
  });
});

module.exports = router;
