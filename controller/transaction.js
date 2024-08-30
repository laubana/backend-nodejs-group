const stripe = require("stripe")(process.env.STRIPE_SECRET);

const { getPaymentIntent, getCharge } = require("../helper/stripe");
const Transaction = require("../model/Transaction");

const addTransaction = async (req, res) => {
  try {
    const { description, paymentIntentId } = req.body;
    const userId = req.id;

    if (!description || !paymentIntentId || !userId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const stripePaymentIntent = await getPaymentIntent({ paymentIntentId });

    const chargeId = stripePaymentIntent.latest_charge;

    const stripeCharge = await getCharge({ chargeId });

    console.log(stripeCharge);

    const newTransaction = await Transaction.create({
      amount: stripeCharge.amount,
      chargeId: stripeCharge.id,
      description,
      receiptUrl: stripeCharge.receipt_url,
      user: userId,
    });

    res
      .status(200)
      .json({
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

    if (!transactionId || !userId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const transaction = await Transaction.findById(transactionId).populate({
      path: "user",
    });

    const response = await stripe.refunds.create({
      charge: transaction.chargeId,
      reason: "requested_by_customer",
    });

    await Transaction.findByIdAndUpdate(
      transactionId,
      { $inc: { amount: -response.amount } },
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
      return res.status(400).json({ message: "Invalid Input" });
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
