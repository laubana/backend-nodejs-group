const mongoose = require("mongoose");
const Registration = require("../model/Registration");

const getRegistrationsGroup = async (req, res) => {
  try {
    const { groupId } = req.query;

    const registrations = await Registration.find({
      group: groupId,
    })
      .populate({
        path: "group",
      })
      .populate({
        path: "user",
      })
      .lean()
      .exec();

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRegistrationGroupUser = async (req, res) => {
  try {
    const { groupId } = req.query;
    const userId = req.id;

    const registration = await Registration.findOne({
      group: groupId,
      user: userId,
    })
      .populate({
        path: "group",
      })
      .populate({
        path: "user",
      })
      .lean()
      .exec();

    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addRegistration = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { groupId } = req.body;
    const userId = req.id;

    if (!groupId || !userId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const registration = await Registration.findOne({
      group: groupId,
      user: userId,
    }).session(session);

    if (registration) {
      return res.status(400).json({
        message:
          "The email address already exists, try with a different email address.",
      });
    }

    const newRegistration = await Registration.create({
      group: groupId,
      user: userId,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(newRegistration);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const deleteRegistrationGroupUser = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.id;

    if (!groupId || !userId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const result = await Registration.deleteMany({
      group: groupId,
      user: userId,
    })
      .lean()
      .exec();

    res.status(201).json({ count: result.deletedCount });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = {
  getRegistrationsGroup,
  getRegistrationGroupUser,
  addRegistration,
  deleteRegistrationGroupUser,
};
