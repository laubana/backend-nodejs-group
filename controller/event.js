const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Event = require("../model/Event");
const Registration = require("../model/Registration");
const User = require("../model/User");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate({
        path: "category",
      })
      .lean()
      .exec();

    res.status(200).json({ message: "", data: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const getEvent = async (req, res) => {
  try {
    const { eventId } = req.query;

    const event = await Event.findById(eventId)
      .populate({
        path: "category",
      })
      .populate({
        path: "user",
      })
      .lean()
      .exec();

    res.status(200).json({ message: "", data: event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const addEvent = async (req, res) => {
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
    const userId = req.id;

    if (
      !address ||
      !categoryId ||
      !description ||
      !imageUrl ||
      !latitude ||
      !longitude ||
      !name ||
      !thumbnailUrl ||
      !userId
    ) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const event = await Event.findOne({ name }).lean().exec();

    if (event) {
      return res.status(409).json({
        message: "The name already exists. Please try another.",
      });
    }

    const newEvent = await Event.create({
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

    const newRegistration = await Registration.create({
      event: newEvent._id,
      user: userId,
    });

    const user = await User.findById(userId).lean().exec();

    const session = await stripe.checkout.sessions.create({
      customer: user.customerId,
      line_items: [
        {
          price: "price_1PHAKdP2UR6e6NwD21p6Xnnf",
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_intent_data: {
        metadata: {
          eventId: newEvent._id.toString(),
          description: "New Event",
          userId: userId,
        },
      },
      success_url: `${
        process.env.FRONTEND_URL
      }/event/detail/${newEvent._id.toString()}`,
    });

    res.status(201).json({
      message: "Event created.",
      data: {
        url: session.url,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  addEvent,
};
