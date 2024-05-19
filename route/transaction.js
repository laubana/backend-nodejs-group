const express = require("express");
const router = express.Router();
const controller = require("../controller/transaction");

const verifyToken = require("../middleware/verifyToken");

router.route("/transactions").get(verifyToken, controller.getAllTransactions);

router.route("/transaction").delete(verifyToken, controller.deleteTransaction);

module.exports = router;
