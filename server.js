// EXPRESS - MONGOOSE
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// AUTH
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

// ROUTES
app.use("/register", routeRegister);
app.use("/login", routeLogin);
app.use("/contacts", routeContacts);

app.get("*", (_req, res) => {
  res.status(404).send("Error 404");
});

// START SERVER
app.listen(8000, () => {
  console.log("Listening");
});
