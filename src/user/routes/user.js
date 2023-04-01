const router = require("express").Router();
const userController = require("../controllers/userControllers");
const middlewareController = require("../controllers/middlewareController");

router.get("/", middlewareController.verifyToken, userController.getAllUsers);
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;
