const express = require("express");
const router = express.Router();
const controller = require("../controller/comment");

const verifyToken = require("../middleware/verifyToken");

router.route("/comments").get(controller.getComments);

router.route("/comment").post(verifyToken, controller.addComment);
router.route("/comment").delete(verifyToken, controller.deleteComment);

module.exports = router;
