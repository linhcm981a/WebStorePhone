const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      require: true,
      unique: true,
    },
    description: String,
    price: Number,
    quantity: Number,
    category: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
