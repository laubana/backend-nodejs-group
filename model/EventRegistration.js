const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    event: { type: ObjectId, ref: "Event", required: true },
    user: { type: ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models["EventEegistration"] ||
  mongoose.model("EventEegistration", eventRegistrationSchema);
