const mongoose = require("mongoose");

const Registration = require("../model/Registration");

const addRegistration = async (req, res) => {
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

    const existingRegistration = await Registration.findOne({
      event: eventId,
      user: userId,
    }).session(session);

    if (existingRegistration) {
      return res.status(409).json({
        message: "Registration already exists.",
      });
    }

    const newRegistration = await Registration.create({
      event: eventId,
      user: userId,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Registration created successfully.",
      data: newRegistration,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const userId = req.id;

    if (!registrationId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await Registration.deleteMany({
      _id: registrationId,
      user: userId,
    });

    res.status(200).json({
      message: "Registration deleted successfully.",
      data: result.deletedCount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const registration = await Registration.findOne({
      event: eventId,
      user: userId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      });

    res.status(200).json({ message: "", data: registration });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const registrations = await Registration.find({
      event: eventId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      });

    res.status(200).json({ message: "", data: registrations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addRegistration,
  deleteRegistration,
  getRegistration,
  getRegistrations,
};
