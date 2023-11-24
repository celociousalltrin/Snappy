var express = require("express");
const { createLike, removeLike } = require("../controllers/likeController");
var router = express.Router();

router.post("/", createLike);
router.delete("/:snapp_id", removeLike);

module.exports = router;
