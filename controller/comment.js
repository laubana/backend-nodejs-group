const Comment = require("../model/Comment");

const getComments = async (req, res) => {
  try {
    const { eventId } = req.query;

    const comments = await Comment.find({
      event: eventId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({ message: "", data: comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const addComment = async (req, res) => {
  try {
    const { eventId, value } = req.body;
    const userId = req.id;

    if (!eventId || !value | !userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const newComment = await Comment.create({
      event: eventId,
      user: userId,
      value,
    });

    res.status(201).json({ message: "Comment created.", data: newComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.id;

    if (!commentId || !userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const result = await Comment.deleteOne({
      _id: commentId,
      user: userId,
    })
      .lean()
      .exec();

    res.status(200).json({
      message: "Comment deleted.",
      data: { count: result.deletedCount },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = {
  getComments,
  addComment,
  deleteComment,
};
