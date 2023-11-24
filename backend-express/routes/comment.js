var express = require("express");
const {
  createComment,
  replyComment,
} = require("../controllers/commentController");
var router = express.Router();

router.route("/").post(createComment).put(replyComment);

module.exports = router;
