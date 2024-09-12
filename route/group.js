const express = require("express");

const controller = require("../controller/group");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/group").post(verifyToken, controller.addGroup);
router.route("/groups").get(controller.getAllGroups);
router.route("/group/:groupId").get(controller.getGroup);
router.route("/group/:groupId").put(verifyToken, controller.updateGroup);

module.exports = router;
