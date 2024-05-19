const express = require("express");
const router = express.Router();
const controller = require("../controller/thread");

const verifyToken = require("../middleware/verifyToken");

router.route("/thread").get(controller.getThread);

router.route("/thread").post(controller.addThread);

module.exports = router;
