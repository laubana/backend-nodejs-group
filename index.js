const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors");
const db = require("./config/db");
const express = require("express");
const mongoose = require("mongoose");

db();

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", require("./route/auth"));
app.use("/api", require("./route/category"));
app.use("/api", require("./route/comment"));
app.use("/api", require("./route/event"));
app.use("/api", require("./route/image"));
app.use("/api", require("./route/registration"));
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
