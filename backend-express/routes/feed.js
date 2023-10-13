var express = require("express");
const { get_feed } = require("../controllers/feedController");
var router = express.Router();

router.route("/").get(get_feed);

module.exports = router;
