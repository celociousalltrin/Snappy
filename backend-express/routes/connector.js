var express = require("express");
const {
  createConnector,
  deleteConnector,
  getConnectorList,
  getConnectorFanList,
  getConnectorAllianceList,
  getConnectorBasedOnFavouritify,
} = require("../controllers/connectorController");
var router = express.Router();

router.get("/list", getConnectorList);
router.get("/fan-list/:id", getConnectorFanList);
router.get(
  "/favouritify-connector-list/:snapp_id/:type",
  getConnectorBasedOnFavouritify
);
router.get("/alliance-list/:id", getConnectorAllianceList);
router.post("/", createConnector);
router.delete("/:alliance_id", deleteConnector);

module.exports = router;
