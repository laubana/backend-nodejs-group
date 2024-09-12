const mongoose = require("mongoose");

const EventRegistration = require("../model/EventRegistration");

const addEventRegistration = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { eventId } = req.body;
    const userId = req.id;

    if (!eventId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingEventRegistration = await EventRegistration.findOne({
      event: eventId,
      user: userId,
    }).session(session);

    if (existingEventRegistration) {
      return res.status(409).json({
        message: "Event registration already exists.",
      });
    }

    const newEventRegistration = await EventRegistration.create({
      event: eventId,
      user: userId,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Event registration created successfully.",
      data: newEventRegistration,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deleteEventRegistration = async (req, res) => {
  try {
    const { eventRegistrationId } = req.params;
    const userId = req.id;

    if (!eventRegistrationId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleteResult = await EventRegistration.deleteMany({
      _id: eventRegistrationId,
      user: userId,
    });

    res.status(200).json({
      message: "Event registration deleted successfully.",
      data: deleteResult.deletedCount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getEventRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const eventRegistration = await EventRegistration.findOne({
      event: eventId,
      user: userId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      });

    res.status(200).json({ message: "", data: eventRegistration });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const eventRegistrations = await EventRegistration.find({
      event: eventId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      });

    res.status(200).json({ message: "", data: eventRegistrations });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addEventRegistration,
  deleteEventRegistration,
  getEventRegistration,
  getEventRegistrations,
};
