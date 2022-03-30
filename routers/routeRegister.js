// EXPRESS - MONGOOSE
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
// AUTH
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// ROUTES
app.post("/", async (req, res) => {
  const validPassword = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,}$/;
  let resultPassword = validPassword.test(req.body.password);

  if (!resultPassword) {
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
