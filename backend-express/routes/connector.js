var express = require("express");
const {
  createConnector,
  deleteConnector,
} = require("../controllers/connectorController");
var router = express.Router();

router.route("/").post(createConnector).delete(deleteConnector);

module.exports = router;
