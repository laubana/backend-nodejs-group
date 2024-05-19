const express = require("express");
const router = express.Router();
const controller = require("../controller/user");

const verifyToken = require("../middleware/verifyToken");

router.route("/user").get(controller.getUser);

module.exports = router;
