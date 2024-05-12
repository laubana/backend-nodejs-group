const mongoose = require("mongoose");
const Comment = require("../model/Comment");

const getCommentsGroup = async (req, res) => {
  try {
    const { groupId } = req.query;

    const comments = await Comment.find({
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

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { groupId, value } = req.body;
    const userId = req.id;

    if (!groupId || !value | !userId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const newComment = await Comment.create({
      group: groupId,
      user: userId,
      value,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const deleteCommentUser = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.id;

    if (!commentId || !userId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const result = await Comment.deleteOne({
      _id: commentId,
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
  getCommentsGroup,
  addComment,
  deleteCommentUser,
};
