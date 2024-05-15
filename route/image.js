const express = require("express");
const router = express.Router();
const controller = require("../controller/image");

const verifyToken = require("../middleware/verifyToken");

router.route("/images").get(controller.getImages);

router.route("/image").post(verifyToken, controller.addImage);
router.route("/image").delete(verifyToken, controller.deleteImage);

module.exports = router;
