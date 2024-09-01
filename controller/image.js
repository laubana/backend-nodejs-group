const Image = require("../model/Image");

const addImage = async (req, res) => {
  try {
    const { eventId, imageUrl } = req.body;
    const userId = req.id;

    if (!eventId || !imageUrl) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newImage = await Image.create({
      event: eventId,
      user: userId,
      imageUrl,
    });

    res
      .status(201)
      .json({ message: "Image created successfully.", data: newImage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const userId = req.id;

    if (!imageId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await Image.deleteOne({
      _id: imageId,
      user: userId,
    });

    res.status(200).json({ message: "", data: result.deletedCount });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Errir" });
  }
};

const getImages = async (req, res) => {
  try {
    const { eventId } = req.params;

    const images = await Image.find({
      event: eventId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "", data: images });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addImage, deleteImage, getImages };
