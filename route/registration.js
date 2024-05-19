const express = require("express");
const router = express.Router();
const controller = require("../controller/registration");

const verifyToken = require("../middleware/verifyToken");

router.route("/registrations/event").get(controller.getRegistrationsEvent);

router.route("/registration").get(verifyToken, controller.getRegistration);
router.route("/registration").post(verifyToken, controller.addRegistration);
router
  .route("/registration")
  .delete(verifyToken, controller.deleteRegistration);

module.exports = router;
