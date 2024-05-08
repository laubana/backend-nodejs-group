const { default: mongoose } = require("mongoose");
const Group = require("../model/Group");

const addRegistration = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { groupId, userId } = req.body;

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

    const newGroup = await Group.create(
      [
        {
          category: categoryId,
          user: userId,
        },
      ],
      { session }
    );

    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getAllGroups,
  getGroup,
  addGroup,
};
