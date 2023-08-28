var express = require("express");

var testRouter = require("../routes/test");

var router = express.Router();

router.use("/user", testRouter);

module.exports = router;
