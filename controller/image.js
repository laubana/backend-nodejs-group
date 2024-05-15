const mongoose = require("mongoose");
const Image = require("../model/Image");

const getImages = async (req, res) => {
  try {
    const { groupId } = req.query;

    const images = await Image.find({
      group: groupId,
    })
      .populate({
        path: "group",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addImage = async (req, res) => {
  try {
    const { groupId, imageUrl } = req.body;
    const userId = req.id;

    if (!groupId || !imageUrl | !userId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const newImage = await Image.create({
      group: groupId,
      user: userId,
      imageUrl,
    });

    res.status(201).json(newImage);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const deleteImage = async (req, res) => {
  try {
    const { commentId: imageId } = req.body;
    const userId = req.id;

    if (!imageId || !userId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const result = await Image.deleteOne({
      _id: imageId,
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

module.exports = { getImages, addImage, deleteImage };
