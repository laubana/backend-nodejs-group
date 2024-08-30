const Category = require("../model/Category");

const addCategory = async (req, res) => {
  try {
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const category = await Category.findOne({ value });

    if (category) {
      return res.status(409).json({
        message: "Category already exists.",
      });
    }

    const newCategory = await Category.create({
      value,
    });

    res
      .status(201)
      .json({ message: "Category created successfully.", data: newCategory });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getAllCategorys = async (req, res) => {
  try {
    const categorys = await Category.find();

    res.status(200).json({ message: "", data: categorys });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = {
  addCategory,
  getAllCategorys,
};
