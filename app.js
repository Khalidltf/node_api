const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URI;

app.use(express.json());
const Product = require("./models/productModel");

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/about", (req, res) => res.send("About us"));
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to Mongodb");
    app.listen(3000, () => console.log("listening on server 3000...."));
  })
  .catch((err) => console.log(err));
