const User = require("../model/User");

const getUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const user = await User.findOne({ _id: userId }).lean().exec();

    res.status(200).json({ message: "", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = {
  getUser,
};
