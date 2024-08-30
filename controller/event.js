const Event = require("../model/Event");
const Registration = require("../model/Registration");

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
      return res.status(400).json({ message: "Invalid Input" });
    }

    const event = await Event.findOne({ name });

    if (event) {
      return res.status(409).json({
        message: "Event already exists.",
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

    await Registration.create({
      event: newEvent._id,
      user: userId,
    });

    res.status(201).json({
      message: "Event created successfully.",
      data: newEvent,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate({
      path: "category",
    });

    res.status(200).json({ message: "", data: events });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId)
      .populate({
        path: "category",
      })
      .populate({
        path: "user",
      });

    res.status(200).json({ message: "", data: event });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addEvent,
  getAllEvents,
  getEvent,
};
