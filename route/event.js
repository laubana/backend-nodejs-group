const express = require("express");

const controller = require("../controller/event");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/event").post(verifyToken, controller.addEvent);
router.route("/event/:eventId").get(controller.getEvent);
router.route("/events/:groupId").get(controller.getGroupEvents);

module.exports = router;
