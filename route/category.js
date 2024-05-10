const express = require("express");
const router = express.Router();
const controller = require("../controller/category");

const verifyToken = require("../middleware/verifyToken");

router.route("/categorys").get(controller.getAllCategorys);

router.route("/category").post(verifyToken, controller.addCategory);

module.exports = router;
