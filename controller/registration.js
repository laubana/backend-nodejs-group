const mongoose = require("mongoose");
const Registration = require("../model/Registration");

const getRegistrationsEvent = async (req, res) => {
  try {
    const { eventId } = req.query;

    if (!eventId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const registrations = await Registration.find({
      event: eventId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      })
      .lean()
      .exec();

    res.status(200).json({ message: "", data: registrations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const getRegistration = async (req, res) => {
  try {
    const { eventId } = req.query;
    const userId = req.id;

    const registration = await Registration.findOne({
      event: eventId,
      user: userId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      })
      .lean()
      .exec();

    res.status(200).json({ message: "", data: registration });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const addRegistration = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { eventId } = req.body;
    const userId = req.id;

    if (!eventId || !userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const registration = await Registration.findOne({
      event: eventId,
      user: userId,
    }).session(session);

    if (registration) {
      return res.status(409).json({
        message: "The registration already exists.",
      });
    }

    const newRegistration = await Registration.create({
      event: eventId,
      user: userId,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "", data: newRegistration });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const { registrationId } = req.body;
    const userId = req.id;

    if (!registrationId || !userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const result = await Registration.deleteMany({
      _id: registrationId,
      user: userId,
    })
      .lean()
      .exec();

    res.status(200).json({
      message: "Registration deleted.",
      data: { count: result.deletedCount },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = {
  getRegistrationsEvent,
  getRegistration,
  addRegistration,
  deleteRegistration,
};
