const express = require("express");
const router = express.Router();
const controller = require("../controller/paymentMethod");

const verifyToken = require("../middleware/verifyToken");

router
  .route("/payment-methods")
  .get(verifyToken, controller.getAllPaymentMethods);

router.route("/payment-method").post(verifyToken, controller.addPaymentMethod);
router
  .route("/payment-method")
  .delete(verifyToken, controller.deletePaymentMethod);

module.exports = router;
