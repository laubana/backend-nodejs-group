const Comment = require("../model/Comment");

const addComment = async (req, res) => {
  try {
    const { eventId, value } = req.body;
    const userId = req.id;

    if (!eventId || !value) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newComment = await Comment.create({
      event: eventId,
      user: userId,
      value,
    });

    res
      .status(201)
      .json({ message: "Comment created successfully.", data: newComment });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.id;

    if (!commentId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleteResult = await Comment.deleteOne({
      _id: commentId,
      user: userId,
    });

    res.status(200).json({
      message: "Comment deleted successfully.",
      data: deleteResult.deletedCount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getComments = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const comments = await Comment.find({
      event: eventId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "", data: comments });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addComment,
  deleteComment,
  getComments,
};
