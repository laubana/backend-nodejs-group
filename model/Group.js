const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    category: { type: ObjectId, ref: "category", required: true },
    user: { type: ObjectId, ref: "user", required: true },
    imageUrl: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("group", groupSchema, "group");
