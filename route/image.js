const express = require("express");

const controller = require("../controller/image");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/image").post(verifyToken, controller.addImage);
router.route("/image/:imageId").delete(verifyToken, controller.deleteImage);
router.route("/images/:eventId").get(controller.getImages);

module.exports = router;
