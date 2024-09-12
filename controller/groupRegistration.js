const mongoose = require("mongoose");

const GroupRegistration = require("../model/GroupRegistration");

const addGroupRegistration = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { groupId } = req.body;
    const userId = req.id;

    if (!groupId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingGroupRegistration = await GroupRegistration.findOne({
      group: groupId,
      user: userId,
    }).session(session);

    if (existingGroupRegistration) {
      return res.status(409).json({
        message: "Group registration already exists.",
      });
    }

    const newGroupRegistration = await GroupRegistration.create({
      group: groupId,
      user: userId,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Group registration created successfully.",
      data: newGroupRegistration,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deleteGroupRegistration = async (req, res) => {
  try {
    const { groupRegistrationId } = req.params;
    const userId = req.id;

    if (!groupRegistrationId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleteResult = await GroupRegistration.deleteMany({
      _id: groupRegistrationId,
      user: userId,
    });

    res.status(200).json({
      message: "Group registration deleted successfully.",
      data: deleteResult.deletedCount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getGroupRegistration = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const groupRegistration = await GroupRegistration.findOne({
      group: groupId,
      user: userId,
    })
      .populate({
        path: "group",
      })
      .populate({
        path: "user",
      });

    res.status(200).json({ message: "", data: groupRegistration });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getGroupRegistrations = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const groupRegistrations = await GroupRegistration.find({
      group: groupId,
    })
      .populate({
        path: "group",
      })
      .populate({
        path: "user",
      });

    res.status(200).json({ message: "", data: groupRegistrations });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addGroupRegistration,
  deleteGroupRegistration,
  getGroupRegistration,
  getGroupRegistrations,
};
