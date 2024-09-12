const express = require("express");

const controller = require("../controller/groupImage");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/group-image").post(verifyToken, controller.addGroupImage);
router
  .route("/group-image/:groupImageId")
  .delete(verifyToken, controller.deleteGroupImage);
router.route("/group-images/:groupId").get(controller.getGroupImages);

module.exports = router;
