const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    group: { type: ObjectId, ref: "group", required: true },
    user: { type: ObjectId, ref: "user", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "registration",
  registrationSchema,
  "registration"
);
