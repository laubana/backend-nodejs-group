const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const eventImageSchema = new mongoose.Schema(
  {
    event: { type: ObjectId, ref: "Event", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EventImage", eventImageSchema, "EventImage");
