const GroupImage = require("../model/GroupImage");

const addGroupImage = async (req, res) => {
  try {
    const { groupId, imageUrl } = req.body;
    const userId = req.id;

    if (!groupId || !imageUrl) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newGroupImage = await GroupImage.create({
      group: groupId,
      user: userId,
      imageUrl,
    });

    res
      .status(201)
      .json({ message: "Image created successfully.", data: newGroupImage });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deleteGroupImage = async (req, res) => {
  try {
    const { imageId: groupImageId } = req.params;
    const userId = req.id;

    if (!groupImageId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleteResult = await GroupImage.deleteOne({
      _id: groupImageId,
      user: userId,
    });

    res.status(200).json({ message: "", data: deleteResult.deletedCount });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getGroupImages = async (req, res) => {
  try {
    const { eventId: groupId } = req.params;

    const groupImages = await GroupImage.find({
      event: groupId,
    })
      .populate({
        path: "group",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "", data: groupImages });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addGroupImage,
  deleteGroupImage,
  getGroupImages,
};
