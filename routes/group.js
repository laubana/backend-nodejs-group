const express = require("express");
const router = express.Router();
const controller = require("../controllers/group");

router.route("/get_category_list").get(controller.getCategoryList);
router.route("/get_group_list").get(controller.getGroupList);

module.exports = router;
