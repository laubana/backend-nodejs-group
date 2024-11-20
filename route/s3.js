const express = require("express");

const controller = require("../controller/s3");
const uploadFile = require("../middleware/uploadFile");

const router = express.Router();

router.route("/upload-image").post(uploadFile, controller.uploadImage);

module.exports = router;
