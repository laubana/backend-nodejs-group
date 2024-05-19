const stripe = require("stripe")(process.env.STRIPE_SECRET);

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
  test,
};
