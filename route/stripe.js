const express = require("express");

const controller = require("../controller/stripe");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/payment-intent").post(verifyToken, controller.addPaymentIntent);
router.route("/setup-intent").post(verifyToken, controller.addSetupIntent);
router
  .route("/payment-method/:paymentMethodId")
  .delete(verifyToken, controller.deletePaymentMethod);
router
  .route("/payment-methods")
  .get(verifyToken, controller.getAllPaymentMethods);

module.exports = router;
