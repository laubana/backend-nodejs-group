const express = require("express");

const controller = require("../controller/category");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/category").post(verifyToken, controller.addCategory);
router.route("/categorys").get(controller.getAllCategorys);

module.exports = router;
