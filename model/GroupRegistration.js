const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const groupRegistrationSchema = new mongoose.Schema(
  {
    group: { type: ObjectId, ref: "Group", required: true },
    user: { type: ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models["GroupRegistration"] ||
  mongoose.model("GroupRegistration", groupRegistrationSchema);
