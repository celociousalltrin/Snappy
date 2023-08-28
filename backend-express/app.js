require("dotenv").config();
var express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var morganStream = require("./request-tracker/morganStream");
var connectDB = require("./config/mongoConnection");

connectDB();

var app = express();
var apiRouter = require("./routes");

app.use(morganStream);

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));

app.use("/api", apiRouter);

module.exports = app;
