const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const eventCommentSchema = new mongoose.Schema(
  {
    event: { type: ObjectId, ref: "Event", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models["EventComment"] ||
  mongoose.model("EventComment", eventCommentSchema);
