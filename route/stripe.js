const express = require("express");
const router = express.Router();
const controller = require("../controller/stripe");

const verifyToken = require("../middleware/verifyToken");

router.route("/payment-intent").post(verifyToken, controller.addPaymentIntent);
router.route("/setup-intent").post(verifyToken, controller.addSetupIntent);
router
  .route("/payment-method")
  .delete(verifyToken, controller.deletePaymentMethod);
router
  .route("/payment-methods")
  .get(verifyToken, controller.getAllPaymentMethods);
router.route("/test").post(controller.test);

module.exports = router;
