const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { loginCheck } = require("../middleware/auth");

router.get("", productController.getAllProduct);
router.post("", loginCheck, productController.addProduct);
router.post("/add-review", loginCheck, productController.postAddReview);
router.get("/:productId", productController.getProductDetail);
router.put("/:productId", loginCheck, productController.editProduct);
router.delete("/:productId", loginCheck, productController.deleteProduct);
router.get("/category/:id", productController.getProductByCategory);

module.exports = router;
