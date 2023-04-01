const router = require("express").Router();
const authController = require("../controllers/authControllers")
const middlewareController = require("../controllers/middlewareController")


router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.post("/logout", middlewareController.verifyToken, authController.logOut);
router.post("/refresh", authController.requestRefreshToken)
module.exports = router;