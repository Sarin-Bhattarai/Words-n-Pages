const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    //trim = any space in the beginning or end there will be trimmed out
    trim: true,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    //trim = any space in the beginning or end there will be trimmed out
    trim: true,
    required: true,
    maxlength: 32,
  },
  genre: {
    type: ObjectId,
    ref: "Genre",
    required: true,
  },
  quantity: {
    type: Number,
  },
  sold: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
