const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const groupImageSchema = new mongoose.Schema(
  {
    group: { type: ObjectId, ref: "Group", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GroupImage", groupImageSchema, "GroupImage");
