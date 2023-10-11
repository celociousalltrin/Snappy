var express = require("express");
var path = require("path");
const cors = require("cors");

var testRouter = require("../routes/test");
var authUserRouter = require("../routes/auth-user");
var validationRouter = require("../routes/validation");
var feedRouter = require("../routes/feed");
var logoutRouter = require("../routes/logout");
var externalAuthUserRouter = require("../routes/external-auth-user");
var authUserMiddleware = require("../middlewares/auth.user.middleware");
var externalAuthUserMiddleware = require("../middlewares/external.auth.user.middleware");

var router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.use("/user", testRouter);
router.use("/auth", authUserRouter);
router.use(
  "/external-auth",
  externalAuthUserMiddleware,
  externalAuthUserRouter
);
router.use("/validation", validationRouter);
router.use("/feed", authUserMiddleware, feedRouter);
router.use("/logout", logoutRouter);

module.exports = router;
