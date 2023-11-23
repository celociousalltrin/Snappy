var express = require("express");
const { get_snapp, create_snapp } = require("../controllers/snappController");
var router = express.Router();

router.route("/").get(get_snapp).post(create_snapp);

module.exports = router;
