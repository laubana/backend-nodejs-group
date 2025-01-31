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

module.exports =
  mongoose.models["GroupImage"] ||
  mongoose.model("GroupImage", groupImageSchema);
