const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Transaction = require("../model/Transaction");

const getAllTransactions = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const transactions = await Transaction.find({
      user: userId,
    })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({ message: "", data: transactions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { threadId, transactionId } = req.body;
    const userId = req.id;

    if (!threadId || !transactionId || !userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const transaction = await Transaction.findById(transactionId)
      .populate({
        path: "user",
      })
      .lean()
      .exec();

    const refund = await stripe.refunds.create({
      charge: transaction.chargeId,
      reason: "requested_by_customer",
      metadata: {
        threadId,
      },
    });

    res.status(200).json({ message: "Transactions deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = {
  getAllTransactions,
  deleteTransaction,
};
