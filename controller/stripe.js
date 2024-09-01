const stripe = require("stripe")(process.env.STRIPE_SECRET);

const {
  confirmPaymentIntent,
  createPaymentIntent,
  createSetupIntent,
  listPaymentMethods,
  removePaymentMethod,
} = require("../helper/stripe");
const User = require("../model/User");

const addPaymentIntent = async (req, res) => {
  try {
    const { amount, paymentMethodId } = req.body;
    const userId = req.id;

    if (!amount) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    const stripPaymentIntent = await createPaymentIntent({
      amount: +amount,
      customerId: user.customerId,
      paymentMethodId,
    });

    if (paymentMethodId) {
      await confirmPaymentIntent({
        paymentIntentId: stripPaymentIntent.id,
      });
    }

    res.status(201).json({
      message: "Payment intent created successfully.",
      data: stripPaymentIntent,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const addSetupIntent = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    const stripeSetupIntent = await createSetupIntent({
      customerId: user.customerId,
    });

    res.status(201).json({
      message: "Setup intent created successfully.",
      data: stripeSetupIntent,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deletePaymentMethod = async (req, res) => {
  try {
    const { paymentMethodId } = req.params;

    if (!paymentMethodId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    await removePaymentMethod({ paymentMethodId });

    res.status(200).json({ message: "Payment method deleted successfully." });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getAllPaymentMethods = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).lean().exec();

    const customerId = user.customerId;

    const paymentMethods = await listPaymentMethods({ customerId });

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

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addPaymentIntent,
  addSetupIntent,
  deletePaymentMethod,
  getAllPaymentMethods,
};
