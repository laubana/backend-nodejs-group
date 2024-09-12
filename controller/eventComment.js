const EventComment = require("../model/EventComment");

const addEventComment = async (req, res) => {
  try {
    const { eventId, value } = req.body;
    const userId = req.id;

    if (!eventId || !value) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newEventComment = await EventComment.create({
      event: eventId,
      user: userId,
      value,
    });

    res.status(201).json({
      message: "Event comment created successfully.",
      data: newEventComment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deleteEventComment = async (req, res) => {
  try {
    const { eventCommentId } = req.params;
    const userId = req.id;

    if (!eventCommentId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleteResult = await EventComment.deleteOne({
      _id: eventCommentId,
      user: userId,
    });

    res.status(200).json({
      message: "Event comment deleted successfully.",
      data: deleteResult.deletedCount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getEventComments = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const eventComments = await EventComment.find({
      event: eventId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "", data: eventComments });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addEventComment,
  deleteEventComment,
  getEventComments,
};
