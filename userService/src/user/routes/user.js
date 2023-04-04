const router = require("express").Router();
const userController = require("../controllers/userControllers");
const {
    verifyToken,
    verifyTokenAndUserAuthorization,
  } = require("../controllers/verifyToken");

router.get("/", verifyToken, userController.getAllUsers);
router.delete(
  "/:id",
  verifyTokenAndUserAuthorization,
  userController.deleteUser
);

module.exports = router;
