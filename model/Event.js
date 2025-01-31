const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    address: { type: String },
    date: { type: Date },
    description: { type: String, required: true },
    fee: { type: Number, required: true, default: 0 },
    group: { type: ObjectId, ref: "Group", required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    name: { type: String, required: true },
    user: { type: ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models["Event"] || mongoose.model("Event", eventSchema);
