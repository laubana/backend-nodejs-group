const express = require("express");
const router = express.Router();
const controller = require("../controller/payment");

const verifyToken = require("../middleware/verifyToken");

router.route("/payments").get(verifyToken, controller.getAllPayments);

module.exports = router;
