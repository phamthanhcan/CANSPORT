const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { loginCheck, isAuth, isAdmin } = require("../middleware/auth");

router.post("/isAdmin", authController.isAdmin);
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/users", loginCheck, isAuth, isAdmin, authController.getAllUser);
router.post("/loginAdmin", authController.loginAdmin);

module.exports = router;
