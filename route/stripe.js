const express = require("express");
const router = express.Router();
const controller = require("../controller/stripe");

const verifyToken = require("../middleware/verifyToken");

router.route("/test").post(controller.test);

module.exports = router;
