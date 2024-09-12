const EventImage = require("../model/EventImage");

const addEventImage = async (req, res) => {
  try {
    const { eventId, imageUrl } = req.body;
    const userId = req.id;

    if (!eventId || !imageUrl) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newEventImage = await EventImage.create({
      event: eventId,
      user: userId,
      imageUrl,
    });

    res.status(201).json({
      message: "Event image created successfully.",
      data: newEventImage,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const deleteEventImage = async (req, res) => {
  try {
    const { eventImageId } = req.params;
    const userId = req.id;

    if (!eventImageId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleteResult = await EventImage.deleteOne({
      _id: eventImageId,
      user: userId,
    });

    res.status(200).json({ message: "", data: deleteResult.deletedCount });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getEventImages = async (req, res) => {
  try {
    const { eventId } = req.params;

    const eventImages = await EventImage.find({
      event: eventId,
    })
      .populate({
        path: "event",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "", data: eventImages });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addEventImage,
  deleteEventImage,
  getEventImages,
};
