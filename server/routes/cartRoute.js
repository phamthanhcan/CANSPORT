const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const { loginCheck } = require("../middleware/auth");

router.get("", loginCheck, cartController.getCardByUser);
router.post("", loginCheck, cartController.addProductCart);
// router.post("", loginCheck, categoryController.addCategory);
// router.put("/:categoryId", loginCheck, categoryController.editCategory);
router.post("/product-cart", loginCheck, cartController.deleteItemCart);
router.delete("/:cartId", loginCheck, cartController.deleteCart);

module.exports = router;
