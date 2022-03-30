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
const Contacts = require("../models/contactModel");
const User = require("../models/userModel");
// SECRET
const secret = "5aJif0OZjepB63NRwyNSkk0czzttHKjXNQbEImrW";

// MIDDLEWARES
function isConnected() {
  let data;

  try {
    data = jwt.verify(req.cookies.jwt, secret);
  } catch (err) {
    return res.status(401).json({
      message: "Your token is not valid",
    });
  }

  console.log(data);

  res.json({
    message: "request accepted",
    data,
  });
}

// ROUTES
router.get("/", isConnected, async (req, res) => {});
router.post("/", isConnected, async (req, res) => {});
router.put("/", isConnected, async (req, res) => {});
router.delete("/", isConnected, async (req, res) => {});

module.exports = router;
