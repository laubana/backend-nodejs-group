const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_pk: { type: Number, required: true },

  user_id: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
  user_name: { type: String, required: true },
  user_location_address: { type: String, required: true },
  user_location_latitude: { type: Number, required: true },
  user_location_longitude: { type: Number, required: true },
  user_location_url: { type: String, required: true },
  user_description: { type: String, required: true },

  created_time: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("t_user", userSchema, "t_user");
