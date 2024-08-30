const express = require("express");
const router = express.Router();
const controller = require("../controller/transaction");

const verifyToken = require("../middleware/verifyToken");

router.route("/transaction").post(verifyToken, controller.addTransaction);
router
  .route("/transaction/:transactionId")
  .delete(verifyToken, controller.deleteTransaction);
router.route("/transactions").get(verifyToken, controller.getAllTransactions);

module.exports = router;
