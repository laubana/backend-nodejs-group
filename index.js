const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors");
const connect = require("./config/db");
require("dotenv").config();
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const express = require("express");
const mongoose = require("mongoose");
const { join } = require("path");

connect();

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/", express.static(join(__dirname, "public")));
app.use("/auth", require("./route/auth"));
app.use("/api", require("./route/category"));
app.use("/api", require("./route/event"));
app.use("/api", require("./route/eventComment"));
app.use("/api", require("./route/eventImage"));
app.use("/api", require("./route/eventRegistration"));
app.use("/api", require("./route/group"));
app.use("/api", require("./route/groupComment"));
app.use("/api", require("./route/groupImage"));
app.use("/api", require("./route/groupRegistration"));
app.use("/api", require("./route/transaction"));
app.use("/api", require("./route/user"));
app.use("/s3", require("./route/s3"));
app.use("/stripe", require("./route/stripe"));

mongoose.connection.once("open", () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server launched at port ${process.env.PORT} 🚀`);
  });
});
