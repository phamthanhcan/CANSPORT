const express = require("express");
const router = express.Router();
const skuController = require("../controller/skuController");

router.post("", skuController.getSkuProduct);

module.exports = router;
