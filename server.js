const mongoose = require("mongoose");
const express = require("express");
require("./configs/db").run();
const app = express();
app.use("/square/group", require("./routes/group"));

mongoose.connection.on("error", () => {
  console.log("Failed to connect to DB.");
});

mongoose.connection.once("open", () => {
  app.listen(80, () => {
    console.log("Server started.");
  });
});
