const stripe = require("stripe")(process.env.STRIPE_SECRET);

const confirmPaymentIntent = async ({ paymentIntentId }) => {
  const stripPaymentIntent = await stripe.paymentIntents.confirm(
    paymentIntentId
  );

  return stripPaymentIntent;
};

const createCustomer = async ({ email, name }) => {
  const stripeCustomer = await stripe.customers.create({ email, name });

  return stripeCustomer;
};

const createPaymentIntent = async ({ amount, customerId, paymentMethodId }) => {
  const stripPaymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "cad",
    customer: customerId,
    payment_method: paymentMethodId,
    automatic_payment_methods: { allow_redirects: "never", enabled: true },
  });

  return stripPaymentIntent;
};

const createPrice = async ({ price, productId }) => {
  const stripePrice = await stripe.prices.create({
    unit_amount: price,
    currency: "cad",
    product: productId,
  });

  return stripePrice;
};

const createProduct = async ({ description, name }) => {
  const stripeProduct = await stripe.products.create({
    name,
    description,
  });

  return stripeProduct;
};

const createSetupIntent = async ({ customerId }) => {
  const stripSetupIntent = await stripe.setupIntents.create({
    customer: customerId,
    automatic_payment_methods: {
      allow_redirects: "never",
      enabled: true,
    },
  });

  return stripSetupIntent;
};

const getCharge = async ({ chargeId }) => {
  const stripeCharge = await stripe.charges.retrieve(chargeId);

  return stripeCharge;
};

const getPaymentIntent = async ({ paymentIntentId }) => {
  const stripePaymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId
  );

  return stripePaymentIntent;
};

const listPaymentMethods = async ({ customerId }) => {
  const paymentMethods = await stripe.customers.listPaymentMethods(customerId);

  return paymentMethods.data;
};

module.exports = {
  confirmPaymentIntent,
  createCustomer,
  createPaymentIntent,
  createPrice,
  createProduct,
  createSetupIntent,
  getCharge,
  getPaymentIntent,
  listPaymentMethods,
};
