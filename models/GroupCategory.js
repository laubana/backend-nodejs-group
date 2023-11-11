const mongoose = require("mongoose");

const groupCategorySchema = new mongoose.Schema({
  group_category_pk: { type: Number, required: true, unique: true },

  group_category_value: { type: String, required: true, unique: true },

  created_time: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model(
  "t_group_category",
  groupCategorySchema,
  "t_group_category"
);
