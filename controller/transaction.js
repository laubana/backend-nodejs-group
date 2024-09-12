const {
  getPaymentIntent,
  getCharge,
  createRefund,
} = require("../helper/stripe");
const Transaction = require("../model/Transaction");

const addTransaction = async (req, res) => {
  try {
    const { description, paymentIntentId } = req.body;
    const userId = req.id;

    if (!description || !paymentIntentId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const stripePaymentIntent = await getPaymentIntent({ paymentIntentId });

    const chargeId = stripePaymentIntent.latest_charge;

    const stripeCharge = await getCharge({ chargeId });

    const newTransaction = await Transaction.create({
      amount: stripeCharge.amount,
      chargeId: stripeCharge.id,
      description,
      receiptUrl: stripeCharge.receipt_url,
      user: userId,
    });

    res.status(200).json({
      message: "Transaction created successfully.",
      data: newTransaction,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.id;

    if (!transactionId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingTransaction = await Transaction.findById(transactionId);

    const stripeRefund = await createRefund({
      chargeId: existingTransaction.chargeId,
    });

    await Transaction.findByIdAndUpdate(
      transactionId,
      { $inc: { amount: -stripeRefund.amount } },
      { new: true }
    );

    res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await Transaction.find({
      user: userId,
    })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "", data: transactions });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addTransaction,
  deleteTransaction,
  getAllTransactions,
};
