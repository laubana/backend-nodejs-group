const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  value: { type: String },
});

module.exports = mongoose.model("Test", testSchema);
