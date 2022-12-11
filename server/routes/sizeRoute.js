const express = require("express");
const router = express.Router();
const sizeController = require("../controller/sizeController");

router.post("", sizeController.getSizesProduct);

module.exports = router;
