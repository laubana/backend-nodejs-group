const express = require("express");
const router = express.Router();
const controller = require("../controller/event");

const verifyToken = require("../middleware/verifyToken");

router.route("/events").get(controller.getAllEvents);

router.route("/event").get(controller.getEvent);
router.route("/event").post(verifyToken, controller.addEvent);

module.exports = router;
