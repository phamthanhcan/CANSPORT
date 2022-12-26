const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const { loginCheck } = require("../middleware/auth");

router.post("/create", loginCheck, orderController.createOrder);
router.post("/confirm", loginCheck, orderController.confirmOrder);
router.get("/user/:userId", loginCheck, orderController.getOrderByUser);
router.get("/", loginCheck, orderController.getAllOrder);

module.exports = router;
