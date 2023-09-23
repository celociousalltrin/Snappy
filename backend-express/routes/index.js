var express = require("express");
var path = require("path");

var testRouter = require("../routes/test");
var authUserRouter = require("../routes/auth-user");
var validationRouter = require("../routes/validation");

var router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.use("/user", testRouter);
router.use("/auth", authUserRouter);
router.use("/validation", validationRouter);

module.exports = router;
