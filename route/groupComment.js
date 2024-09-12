const express = require("express");

const controller = require("../controller/groupComment");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/group-comment").post(verifyToken, controller.addGroupComment);
router
  .route("/group-comment/:groupCommentId")
  .delete(verifyToken, controller.deleteGroupComment);
router.route("/group-comments/:groupId").get(controller.getGroupComments);

module.exports = router;
