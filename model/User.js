const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    imageUrl: { type: String },
    name: { type: String, required: true },
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    description: { type: String },
    customerId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models["User"] || mongoose.model("User", userSchema);
