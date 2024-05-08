const express = require("express");
const router = express.Router();
const controller = require("../controller/category");

router.route("/categorys").get(controller.getAllCategorys);

router.route("/category").post(controller.addCategory);

module.exports = router;
