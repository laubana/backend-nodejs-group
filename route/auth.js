const express = require("express");

const controller = require("../controller/auth");

const router = express.Router();

router.route("/oauth").get(controller.oauth);
router.route("/refresh").get(controller.refresh);
router.route("/sign-in").post(controller.signIn);
router.route("/sign-out").post(controller.signOut);
router.route("/sign-up").post(controller.signUp);

module.exports = router;
