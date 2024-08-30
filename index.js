const mongoose = require("mongoose");
const express = require("express");
require("./config/db").db();
const cors = require("cors");
const app = express();
app.use(require("cookie-parser")());
app.use(cors(require("./config/cors").cors));
app.use(express.json());
app.use("/auth", require("./route/auth"));
app.use("/api", require("./route/category"));
app.use("/api", require("./route/comment"));
app.use("/api", require("./route/event"));
app.use("/api", require("./route/image"));
app.use("/api", require("./route/registration"));
app.use("/api", require("./route/thread"));
app.use("/api", require("./route/transaction"));
app.use("/api", require("./route/user"));
app.use("/stripe", require("./route/stripe"));
app.use("/webhook", require("./webhook/stripe"));

mongoose.connection.on("error", () => {
  console.log("Failed to connect to DB.");
});

mongoose.connection.once("open", () => {
  app.listen(process.env.PORT, () => {
    console.log(`PORT : ${process.env.PORT}`);
  });
});
