const stripe = require("stripe")(process.env.STRIPE_SECRET);

const {
  confirmPaymentIntent,
  createPaymentIntent,
  createSetupIntent,
} = require("../helper/stripe");
const User = require("../model/User");

const addPaymentIntent = async (req, res) => {
  try {
    const { amount, paymentMethodId } = req.body;
    const userId = req.id;

    if (!amount || !userId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const user = await User.findById(userId);

    const newStripPaymentIntent = await createPaymentIntent({
      amount: +amount,
      customerId: user.customerId,
      paymentMethodId,
    });

    if (paymentMethodId) {
      await confirmPaymentIntent({
        paymentIntentId: newStripPaymentIntent.id,
      });
    }

    res.status(201).json({
      message: "Payment intent created successfully.",
      data: newStripPaymentIntent,
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
      return res.status(400).json({ message: "Invalid Input" });
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
    const { paymentMethodId } = req.body;

    if (!paymentMethodId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    await stripe.paymentMethods.detach(paymentMethodId);

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
      return res.status(400).json({ message: "Invalid Input" });
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

    res.status(500).json({ message: "Server Error" });
  }
};

const test = async (req, res) => {
  try {
    // stripe.products
    //   .create({
    //     name: "Starter Subscription",
    //     description: "$12/Month subscription",
    //   })
    //   .then((product) => {
    //     stripe.prices
    //       .create({
    //         unit_amount: 1200,
    //         currency: "usd",
    //         recurring: {
    //           interval: "month",
    //         },
    //         product: product.id,
    //       })
    //       .then((price) => {
    //         console.log(
    //           "Success! Here is your starter subscription product id: " +
    //             product.id
    //         );
    //         console.log(
    //           "Success! Here is your starter subscription price id: " + price.id
    //         );
    //       });
    //   });

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: 1099,
    //   currency: "usd",
    // });

    // const paymentIntent = await stripe.paymentIntents.confirm(
    //   "pi_3PGwEbP2UR6e6NwD04WSo8Bp",
    //   {
    //     payment_method: "pm_card_visa",
    //     return_url: "https://www.example.com",
    //   }
    // );

    // const session = await stripe.checkout.sessions.create({
    //   line_items: [
    //     {
    //       price: "price_1PGvcTP2UR6e6NwDdaqdqoEW",
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "subscription",
    //   success_url: `https://gmail.com/`,
    //   cancel_url: `https://gmail.com/`,
    // });

    const paymentMethods = await stripe.customers.listPaymentMethods(
      "cus_Q7Sp68NqVMvPwp"
    );
    console.log(paymentMethods);

    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPaymentIntent,
  addSetupIntent,
  deletePaymentMethod,
  getAllPaymentMethods,
  test,
};
