const stripe = require("stripe")(process.env.STRIPE_SECRET);
const User = require("../model/User");

const getAllPayments = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const user = await User.findById(userId).lean().exec();

    const customerId = user.customerId;

    const charges = await stripe.charges.list({
      customer: customerId,
    });

    res.status(200).json(
      charges.data.map((charge) => ({
        amount: charge.amount - charge.amount_refunded,
        description: charge.description,
        id: charge.id,
        receiptUrl: charge.receipt_url,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = {
  getAllPayments,
};
