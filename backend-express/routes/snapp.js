var express = require("express");
const {
  get_snapps,
  create_snapp,
  get_single_snapp,
  getUserBasedFavouritifySnapps,
  getUserSnapps,
} = require("../controllers/snappController");

var router = express.Router();

router.get("/user-snapps", getUserSnapps);
router.get("/:type", get_snapps);
router.post("/", create_snapp);
router.get("/single-snapp/:snapp_id", get_single_snapp);
router.get("/user-snapps-favouritify/:type", getUserBasedFavouritifySnapps);

module.exports = router;
