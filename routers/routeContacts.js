// EXPRESS - MONGOOSE
const express = require("express");
const router = express.Router();
const app = express();
// AUTH
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// MODELS
const Contacts = require("../models/contactsModel");
const User = require("../models/userModel");
// SECRET
const secret = "5aJif0OZjepB63NRwyNSkk0czzttHKjXNQbEImrW";

// MIDDLEWARES
app.use(cookieParser());
app.use(express.json());

function isConnected(req, res, next) {
  try {
    const user = jwt.verify(req.cookies.jwt, secret);
    req.user = user;
  } catch (err) {
    return res.status(401).json({
      message: "Your token is not valid",
    });
  }

  next();
}

async function useQuery(req, res, next) {
  if (req.query) {
    const query = Object.keys(req.query);

    if (query.length > 1) {
      return res.json({ message: "You can add only one query param" });
    }
    if (
      query[0] !== "name" &&
      query[0] !== "category" &&
      query[0] !== "email"
    ) {
      return res.json({
        message: "Query param not valid, use name / category / email",
      });
    }

    let queryResult;

    try {
      queryResult = await Contacts.find(req.query);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error 400" });
    }
    if (queryResult.length < 1) {
      return res.json({ message: "Wrong query used" });
    }

    return res.json(queryResult);
  }
  next();
}

// ROUTES
router.get("/", useQuery, isConnected, async (req, res) => {
  try {
    const contacts = await Contacts.find(req.userId);

    res.json({
      contacts: contacts,
      nb: contacts.length,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error 400",
    });
  }
});
router.post("/", isConnected, async (req, res) => {
  try {
    await Contacts.create({
      userId: req.user.id,
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
      category: req.body.category,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error 400",
    });
  }

  res.status(201).json({
    message: `Contact ${req.body.name} created`,
  });
});
router.put("/:contactId", isConnected, async (req, res) => {
  try {
    const contact = await Contacts.findOne(
      { _id: req.params.contactId },
      { userId: req.user.id }
    );
    const contactUpdated = await Contacts.findByIdAndUpdate(
      contact._id,
      req.body
    );
    res.json({
      success: true,
      message: "Updated done",
      modifications: contactUpdated,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Error",
    });
  }
});
router.delete("/:contactId", isConnected, async (req, res) => {
  try {
    await Contacts.findOneAndDelete(
      { _id: req.params.contactId },
      { userId: req.user.id }
    );
    res.json({
      success: true,
      message: "Contact deleted",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "An error happened",
    });
  }
});

module.exports = router;
