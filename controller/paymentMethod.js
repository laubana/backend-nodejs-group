const stripe = require("stripe")(process.env.STRIPE_SECRET);
const User = require("../model/User");

const getAllPaymentMethods = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const user = await User.findById(userId).lean().exec();

    const customerId = user.customerId;

    const paymentMethods = await stripe.customers.listPaymentMethods(
      customerId
    );

    res.status(200).json({
      message: "",
      data: paymentMethods.data.map((paymentMethod) => ({
        brand: paymentMethod.card.brand,
        lastDigits: paymentMethod.card.last4,
        id: paymentMethod.id,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const addPaymentMethod = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const user = await User.findById(userId).lean().exec();

    const customerId = user.customerId;

    const session = await stripe.checkout.sessions.create({
      currency: "cad",
      customer: customerId,
      metadata: {},
      mode: "setup",
      success_url: `${process.env.FRONTEND_URL}/user/detail/${userId}`,
    });

    res.status(200).json({ message: "", data: { url: session.url } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const deletePaymentMethod = async (req, res) => {
  try {
    const { paymentMethodId } = req.body;

    if (!paymentMethodId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const paymentMethods = await stripe.paymentMethods.detach(paymentMethodId);

    res.status(200).json({ message: "Payment method deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = {
  getAllPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
};
