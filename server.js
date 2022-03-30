// EXPRESS - MONGOOSE
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// AUTH
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// ROUTERS
const routeRegister = require("./routers/routeRegister");
const routeLogin = require("./routers/routeLogin");
const routeContacts = require("./routers/routeContacts");

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// MOMNGODB
mongoose
  .connect(
    "mongodb+srv://Konexio-root-kevinganem:root@cluster0.18asb.mongodb.net/crmDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

// ROUTE-REGISTER
app.use("/register", routeRegister);

// ROUTE-LOGIN
app.use("/login", routeLogin);

// ROUTE-CONTACT
app.use("/contacts", routeContacts);

// START SERVER
app.listen(8000, () => {
  console.log("Listening");
});
