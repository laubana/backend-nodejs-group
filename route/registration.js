const express = require("express");
const router = express.Router();
const controller = require("../controller/registration");

const verifyToken = require("../middleware/verifyToken");

router.route("/registrations/group").get(controller.getRegistrationsGroup);

router
  .route("/registration/group/user")
  .get(verifyToken, controller.getRegistrationGroupUser);
router
  .route("/registration/group/user")
  .delete(verifyToken, controller.deleteRegistrationGroupUser);
router.route("/registration").post(verifyToken, controller.addRegistration);

module.exports = router;
