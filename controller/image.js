const Image = require("../model/Image");

const getImages = async (req, res) => {
  try {
    const { eventId } = req.query;

    const images = await Image.find({
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

    res.status(200).json({ message: "", data: images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const addImage = async (req, res) => {
  try {
    const { eventId, imageUrl } = req.body;
    const userId = req.id;

    if (!eventId || !imageUrl | !userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const newImage = await Image.create({
      event: eventId,
      user: userId,
      imageUrl,
    });

    res.status(201).json({ message: "Image created.", data: newImage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { imageId } = req.body;
    const userId = req.id;

    if (!imageId || !userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const result = await Image.deleteOne({
      _id: imageId,
      user: userId,
    })
      .lean()
      .exec();

    res.status(200).json({ message: "", data: { count: result.deletedCount } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = { getImages, addImage, deleteImage };
