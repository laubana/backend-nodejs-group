require("dotenv").config();
const mongoose = require("mongoose");
const Group = require("./models/Group");

const db = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};
db();

mongoose.connection.once("open", async () => {
  await Group.updateOne(
    { _id: "6503a5794fb9bbf4c7bab3b5" },
    { group_name: "test" }
  );
});
