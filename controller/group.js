const Group = require("../model/Group");

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().lean();

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addGroup = async (req, res) => {
  try {
    const {
      categoryId,
      userId,
      imageUrl,
      name,
      address,
      latitude,
      longitude,
      description,
    } = req.body;

    if (!categoryId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const group = await Group.findOne({ name }).lean().exec();

    if (group) {
      return res.status(400).json({
        message:
          "The email address already exists, try with a different email address.",
      });
    }

    console.log(group);

    const newGroup = await Group.create({
      category: categoryId,
      user: userId,
      imageUrl,
      name,
      address,
      latitude,
      longitude,
      description,
    });

    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getAllGroups,
  addGroup,
};
