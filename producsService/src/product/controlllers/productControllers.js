const Product = require("../models/Product");

const productController = {
  createProduct: async (req, res) => {
    try {
      const newProduct = await new Product({
        nameProduct: req.body.nameProduct,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        image: req.body.image,
      });

      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Create product not found" });
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const product = await Product.find();
      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Get all product not found" });
    }
  },
  getAProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Get a product not found" });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Update a product not found" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Delete a  successfully" });
    } catch (error) {
      res.status(500).json({ message: "Delete a product not found" });
    }
  },
};

module.exports = productController;
