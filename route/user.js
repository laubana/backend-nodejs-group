const express = require("express");

const controller = require("../controller/user");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/user/:userId").get(controller.getUser);

module.exports = router;
