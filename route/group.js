const express = require("express");
const router = express.Router();
const controller = require("../controller/group");

router.route("/group").post(controller.addGroup);

router.route("/groups").get(controller.getAllGroups);

module.exports = router;
