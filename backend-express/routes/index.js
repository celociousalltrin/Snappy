var express = require("express");
var path = require("path");

var testRouter = require("../routes/test");

var router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.use("/user", testRouter);

module.exports = router;
