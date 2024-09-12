const express = require("express");

const controller = require("../controller/eventImage");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/event-image").post(verifyToken, controller.addEventImage);
router
  .route("/event-image/:eventImageId")
  .delete(verifyToken, controller.deleteEventImage);
router.route("/event-images/:eventId").get(controller.getEventImages);

module.exports = router;
