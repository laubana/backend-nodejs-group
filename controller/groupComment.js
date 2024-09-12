const GroupComment = require("../model/GroupComment");

const addGroupComment = async (req, res) => {
  try {
    const { groupId, value } = req.body;
    const userId = req.id;

    if (!groupId || !value) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newGroupComment = await GroupComment.create({
      group: groupId,
      user: userId,
      value,
    });

    res.status(201).json({
      message: "Group comment created successfully.",
      data: newGroupComment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deleteGroupComment = async (req, res) => {
  try {
    const { commentId: groupCommentId } = req.params;
    const userId = req.id;

    if (!groupCommentId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleteResult = await GroupComment.deleteOne({
      _id: groupCommentId,
      user: userId,
    });

    res.status(200).json({
      message: "Group comment deleted successfully.",
      data: deleteResult.deletedCount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getGroupComments = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const groupComments = await GroupComment.find({
      group: groupId,
    })
      .populate({
        path: "group",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "", data: groupComments });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addGroupComment,
  deleteGroupComment,
  getGroupComments,
};
