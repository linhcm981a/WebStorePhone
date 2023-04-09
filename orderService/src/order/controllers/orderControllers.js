const axios = require("axios");
const Order = require("../models/Order");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { user, productIds } = req.body;
  
      if (!user || !productIds) {
        return res.status(400).json({ message: "User and productIds are required" });
      }
  
      const userResponse = await axios.get(`http://localhost:3000/user/${user}`);
      if (userResponse.status !== 200) {
        return res.status(userResponse.status).json({ message: "Failed to get user data", error: userResponse.data });
      }
      const userData = userResponse.data;
      console.log("userData", userData);
  
      const productResponse = await axios.get(`http://localhost:4000/product?ids=${productIds}`);
      if (productResponse.status !== 200) {
        return res.status(productResponse.status).json({ message: "Failed to get product data", error: productResponse.data });
      }
      const productsData = productResponse.data;
      console.log("productsData", productsData);
  
      const orders = await Promise.all(
        productsData.map((productData) => {
          const order = new Order({
            userId: userData._id,
            productId: productData._id,
            quantity: productData.quantity || 1, // Sử dụng số lượng được chỉ định trong yêu cầu, nếu không sử dụng giá trị mặc định là 1
            totalPrice: productData.price * (productData.quantity || 1), // Tính toán giá trị đơn hàng dựa trên giá sản phẩm và số lượng được chỉ định
          });
  
          console.log("order", order);
  
          return order.save();
        })
      );
      console.log("orders", orders);
  
      return res.status(200).json({ message: "Create new orders", orders });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to create orders", error });
    }
  },
  
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      if (!orders) {
        return res.status(404).json({ message: "Get all order not found" });
      }
      return res.status(200).json({ message: " Get all order", orders });
    } catch (error) {
      res.status(500).json({ message: "Get all order not found", error });
    }
  },
  getOrder: async (req, res) => {
    try {
      
    } catch (error) {
      res.status(500).json({ message: "Get all order not found", error });
    }
  }
};

module.exports = orderController;
