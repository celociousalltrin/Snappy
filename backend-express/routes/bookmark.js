var express = require("express");
const {
  createBookmark,
  removeBookmark,
} = require("../controllers/bookmarkController");
var router = express.Router();

router.post("/", createBookmark);
router.delete("/:snapp_id", removeBookmark);

module.exports = router;
