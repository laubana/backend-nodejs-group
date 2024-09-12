const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    chargeId: { type: String, required: true },
    description: { type: String, required: true },
    receiptUrl: { type: String, required: true },
    user: { type: ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Transaction",
  transactionSchema,
  "Transaction"
);
