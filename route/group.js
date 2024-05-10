const express = require("express");
const router = express.Router();
const controller = require("../controller/group");

const verifyToken = require("../middleware/verifyToken");

router.route("/groups").get(controller.getAllGroups);

router.route("/group").get(controller.getGroup);
router.route("/group").post(verifyToken, controller.addGroup);

module.exports = router;
