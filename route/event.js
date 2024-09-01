const express = require("express");

const controller = require("../controller/event");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/event").post(verifyToken, controller.addEvent);
router.route("/events").get(controller.getAllEvents);
router.route("/event/:eventId").get(controller.getEvent);

module.exports = router;
