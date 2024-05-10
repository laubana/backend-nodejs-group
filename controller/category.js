const Category = require("../model/Category");

const getAllCategorys = async (req, res) => {
  try {
    const categorys = await Category.find().lean().exec();

    res.status(200).json(categorys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const category = await Category.findOne({ value }).lean().exec();

    if (category) {
      return res.status(400).json({
        message:
          "The email address already exists, try with a different email address.",
      });
    }

    const newCategory = await Category.create({
      value,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getAllCategorys,
  addCategory,
};
