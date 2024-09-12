const {
  confirmPaymentIntent,
  createPaymentIntent,
  createRefund,
  getCharge,
  getPaymentIntent,
} = require("../helper/stripe");
const Group = require("../model/Group");
const GroupRegistration = require("../model/GroupRegistration");
const Transaction = require("../model/Transaction");
const User = require("../model/User");

const addGroup = async (req, res) => {
  try {
    const {
      address,
      categoryId,
      description,
      imageUrl,
      latitude,
      longitude,
      name,
      paymentIntentId,
      paymentMethodId,
      thumbnailUrl,
    } = req.body;
    const userId = req.id;

    if (
      !address ||
      !categoryId ||
      !description ||
      !imageUrl ||
      !latitude ||
      !longitude ||
      !name ||
      (!paymentIntentId && !paymentMethodId) ||
      !thumbnailUrl
    ) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingGroup = await Group.findOne({ name });

    if (existingGroup) {
      if (paymentIntentId) {
        const stripePaymentIntent = await getPaymentIntent({ paymentIntentId });

        const stripeCharge = await getCharge({
          chargeId: stripePaymentIntent.latest_charge,
        });

        await createRefund({
          chargeId: stripeCharge.id,
        });
      }

      return res.status(409).json({
        message: "Group already exists.",
      });
    }

    const user = await User.findById(userId);

    let stripeCharge;

    if (paymentMethodId) {
      const newStripePaymentIntent = await createPaymentIntent({
        amount: 300,
        customerId: user.customerId,
        paymentMethodId,
      });

      const confirmedStripePaymentIntent = await confirmPaymentIntent({
        paymentIntentId: newStripePaymentIntent.id,
      });

      stripeCharge = await getCharge({
        chargeId: confirmedStripePaymentIntent.latest_charge,
      });
    }

    if (paymentIntentId) {
      const stripePaymentIntent = await getPaymentIntent({ paymentIntentId });

      stripeCharge = await getCharge({
        chargeId: stripePaymentIntent.latest_charge,
      });
    }

    await Transaction.create({
      amount: stripeCharge.amount,
      chargeId: stripeCharge.id,
      description: "New Group",
      receiptUrl: stripeCharge.receipt_url,
      user: userId,
    });

    const newGroup = await Group.create({
      category: categoryId,
      user: userId,
      thumbnailUrl,
      imageUrl,
      name,
      address,
      latitude,
      longitude,
      description,
    });

    await GroupRegistration.create({
      group: newGroup._id,
      user: userId,
    });

    res.status(201).json({
      message: "Group created successfully.",
      data: newGroup,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find()
      .populate({
        path: "category",
      })
      .populate({
        path: "user",
      });

    res.status(200).json({ message: "", data: groups });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId)
      .populate({
        path: "category",
      })
      .populate({
        path: "user",
      });

    res.status(200).json({ message: "", data: group });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const updateGroup = async (req, res) => {
  try {
    const {
      address,
      categoryId,
      description,
      imageUrl,
      latitude,
      longitude,
      name,
      thumbnailUrl,
    } = req.body;
    const { groupId } = req.params;
    const userId = req.id;

    if (
      !address ||
      !categoryId ||
      !description ||
      !imageUrl ||
      !latitude ||
      !longitude ||
      !name ||
      !thumbnailUrl
    ) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingGroup = await Group.findOne({ name });

    if (existingGroup.user._id.toString() !== userId) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const updatedGroup = await Group.findByIdAndUpdate(groupId, {
      category: categoryId,
      thumbnailUrl,
      imageUrl,
      name,
      address,
      latitude,
      longitude,
      description,
    });

    res.status(201).json({
      message: "Group updated successfully.",
      data: updatedGroup,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addGroup,
  getAllGroups,
  getGroup,
  updateGroup,
};
