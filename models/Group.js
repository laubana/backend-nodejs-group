const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  group_pk: { type: Number, required: true, unique: true },
  group_category_pk: { type: Number, required: true },
  user_pk: { type: Number, required: true },

  group_name: { type: String, required: true, unique: true },
  group_location_address: { type: String, required: true },
  group_location_latitude: { type: Number, required: true },
  group_location_longitude: { type: Number, required: true },
  group_location_url: { type: String, required: true },
  group_description: { type: String, required: true },

  created_time: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("t_group", groupSchema, "t_group");
