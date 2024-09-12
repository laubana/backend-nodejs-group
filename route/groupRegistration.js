const express = require("express");

const controller = require("../controller/groupRegistration");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router
  .route("/group-registration")
  .post(verifyToken, controller.addGroupRegistration);
router
  .route("/group-registration/:groupRegistrationId")
  .delete(verifyToken, controller.deleteGroupRegistration);
router
  .route("/group-registration/:groupId")
  .get(verifyToken, controller.getGroupRegistration);
router
  .route("/group-registrations/:groupId")
  .get(controller.getGroupRegistrations);

module.exports = router;
