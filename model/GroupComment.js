const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const groupCommentSchema = new mongoose.Schema(
  {
    group: { type: ObjectId, ref: "Group", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "GroupComment",
  groupCommentSchema,
  "GroupComment"
);
