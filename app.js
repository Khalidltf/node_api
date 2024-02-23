const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URI;

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/about", (req, res) => res.send("About us"));

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to Mongodb");
    app.listen(3000, () => console.log("listening on server 3000...."));
  })
  .catch((err) => console.log(err));
