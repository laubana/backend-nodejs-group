const express = require("express");
const router = express.Router();
const controller = require("../controller/comment");

const verifyToken = require("../middleware/verifyToken");

router.route("/comments/group").get(controller.getCommentsGroup);

router.route("/comment/user").delete(verifyToken, controller.deleteCommentUser);
router.route("/comment").post(verifyToken, controller.addComment);

module.exports = router;
