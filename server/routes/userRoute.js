const express = require("express");
const router = express.Router();
const { loginCheck, isAdmin } = require("../middleware/auth");
const usersController = require("../controller/userController");

router.get("/", loginCheck, usersController.getListUser);
router.get("/:userId", loginCheck, usersController.getSingleUser);
router.put("/:userId", loginCheck, usersController.editUser);
router.put(
  "/:userId/change-password",
  loginCheck,
  usersController.changePassword
);
router.delete("/:userId", loginCheck, usersController.deleteUser);

module.exports = router;
