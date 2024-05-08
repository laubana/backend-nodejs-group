const express = require("express");
const router = express.Router();
const controller = require("../controller/auth");

router.route("/sign-up").post(controller.signUp);
router.route("/sign-in").post(controller.signIn);
router.route("/refresh").get(controller.refresh);

module.exports = router;
