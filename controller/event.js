const Event = require("../model/Event");
const EventRegistration = require("../model/EventRegistration");

const addEvent = async (req, res) => {
  try {
    console.log(req.body);
    const { dateTimes, description, fee, groupId, name, places } = req.body;
    const userId = req.id;

    if (
      !dateTimes ||
      dateTimes.length === 0 ||
      !description ||
      !fee ||
      !groupId ||
      !name ||
      !places ||
      places.length === 0
    ) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newEvent = await Event.create({
      description,
      fee,
      group: groupId,
      name,
      user: userId,
    });

    await EventRegistration.create({
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

const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId)
      .populate({
        path: "group",
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

const getGroupEvents = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const events = await Event.find({ group: groupId })
      .populate({
        path: "group",
      })
      .populate({
        path: "user",
      });

    res.status(200).json({ message: "", data: events });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addEvent,
  getEvent,
  getGroupEvents,
};
