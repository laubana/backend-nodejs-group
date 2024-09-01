const User = require("../model/User");

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const user = await User.findById(userId);

    res.status(200).json({ message: "", data: user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getUser,
};
