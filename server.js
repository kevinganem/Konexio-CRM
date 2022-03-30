// EXPRESS - MONGOOSE
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// MODELS

// MIDDLEWARES
app.use(express.json());

// MOMNGODB
mongoose
  .connect(
    "mongodb+srv://Konexio-root-kevinganem:root@cluster0.18asb.mongodb.net/Konexio?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

// ROUTES

// START SERVER
app.listen(8000, () => {
  console.log("Listening");
});
