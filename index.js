const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const corsConfig = require("./config/corsConfig");
const dbConfig = require("./config/dbConfig");

dotenv.config();
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

dbConfig.connect();

const app = express();
app.use(cors(corsConfig.corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
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
