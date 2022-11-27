const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const { loginCheck } = require("../middleware/auth");

router.get("", categoryController.getAllCategory);
router.post("", loginCheck, categoryController.addCategory);
router.put("/:categoryId", loginCheck, categoryController.editCategory);
router.delete("/:categoryId", loginCheck, categoryController.deleteCategory);

module.exports = router;
