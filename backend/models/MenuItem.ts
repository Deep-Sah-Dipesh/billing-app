const mongoose = require("mongoose");

const thing = new mongoose.Schema({
  counter: { type: Number, required: true },
});

const itemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  rate: { type: Number, required: true },
});

const menuSchema = new mongoose.Schema({
  items: { type: [itemSchema], required: true },
});

export const Menu = mongoose.model("Menu", menuSchema);

export const Thing = mongoose.model("Thing", thing);
