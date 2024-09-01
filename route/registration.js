const express = require("express");

const controller = require("../controller/registration");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/registration").post(verifyToken, controller.addRegistration);
router
  .route("/registration/:registrationId")
  .delete(verifyToken, controller.deleteRegistration);
router
  .route("/registration/:eventId")
  .get(verifyToken, controller.getRegistration);
router.route("/registrations/:eventId").get(controller.getRegistrations);

module.exports = router;
