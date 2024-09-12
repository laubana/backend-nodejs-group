const express = require("express");

const controller = require("../controller/eventRegistration");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router
  .route("/event-registration")
  .post(verifyToken, controller.addEventRegistration);
router
  .route("/event-registration/:eventRegistrationId")
  .delete(verifyToken, controller.deleteEventRegistration);
router
  .route("/event-registration/:eventId")
  .get(verifyToken, controller.getEventRegistration);
router
  .route("/event-registrations/:eventId")
  .get(controller.getEventRegistrations);

module.exports = router;
