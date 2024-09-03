// index.js

const express = require("express");
const cors = require("cors");

import { Menu, Thing } from "./models/MenuItem";
const mongoose = require("mongoose");

// const itemSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   rate: { type: Number, required: true },
// });

// const menuSchema = new mongoose.Schema({
//   items: { type: [itemSchema], required: true },
// });

// const Menu = mongoose.model("Menu", menuSchema);

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const menuData = {
  items: [
    {
      id: 1,
      name: "Special Tea",
      image: "https://via.placeholder.com/150",
      rate: 30.0,
    },
    {
      id: 2,
      name: "Coffee",
      image: "https://via.placeholder.com/150",
      rate: 40.0,
    },
    {
      id: 3,
      name: "Samosa",
      image: "https://via.placeholder.com/150",
      rate: 15.0,
    },
    {
      id: 4,
      name: "Pakoda",
      image: "https://via.placeholder.com/150",
      rate: 10.0,
    },
    {
      id: 5,
      name: "Jalebi",
      image: "https://via.placeholder.com/150",
      rate: 20.0,
    },
  ],
};

const menu = new Menu(menuData);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", async (req, res) => {
  const menu = new Menu(req.body);
  console.log(req.body);
  await menu.save();
  const b = await Thing.findById("66d2f504c8f5ec95caab62db");
  console.log(b.counter);
  const u = await Thing.findByIdAndUpdate(
    "66d2f504c8f5ec95caab62db", // Replace with the actual _id
    { counter: b.counter + 1 }, // The fields to update
    { new: true, useFindAndModify: true },
  ); // Options (new: true returns the updated document)

  res.json({
    Number: u.counter,
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
