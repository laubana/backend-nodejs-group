const Category = require("../model/Category");

const getAllCategorys = async (req, res) => {
  try {
    const categorys = await Category.find().lean().exec();

    res.status(200).json({ message: "", data: categorys });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

const addCategory = async (req, res) => {
  try {
    const { value } = req.body;

    if (!value) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const category = await Category.findOne({ value }).lean().exec();

    if (category) {
      return res.status(409).json({
        message: "The value already exists. Please try another.",
      });
    }

    const newCategory = await Category.create({
      value,
    });

    res.status(201).json({ message: "Category created.", data: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = {
  getAllCategorys,
  addCategory,
};
