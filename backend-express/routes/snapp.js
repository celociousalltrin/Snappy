var express = require("express");
const { get_snapps, create_snapp } = require("../controllers/snappController");
var router = express.Router();

router.get("/:type", get_snapps);
router.post("/", create_snapp);

module.exports = router;
