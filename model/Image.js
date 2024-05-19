const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    event: { type: ObjectId, ref: "event", required: true },
    user: { type: ObjectId, ref: "user", required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("image", imageSchema, "image");
