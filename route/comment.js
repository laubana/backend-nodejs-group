const express = require("express");

const controller = require("../controller/comment");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/comment").post(verifyToken, controller.addComment);
router
  .route("/comment/:commentId")
  .delete(verifyToken, controller.deleteComment);
router.route("/comments/:eventId").get(controller.getComments);

module.exports = router;
