const orderController = require("../controllers/orderControllers");

const router = require("express").Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);


module.exports = router;
