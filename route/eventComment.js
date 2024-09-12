const express = require("express");

const controller = require("../controller/eventComment");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/event-comment").post(verifyToken, controller.addEventComment);
router
  .route("/event-comment/:eventCommentId")
  .delete(verifyToken, controller.deleteEventComment);
router.route("/event-comments/:eventId").get(controller.getEventComments);

module.exports = router;
