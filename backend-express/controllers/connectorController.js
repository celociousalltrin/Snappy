const connectorModel = require("../models/connectorModel");
const userModel = require("../models/userModel");
const {
  createConnectorService,
  deleteConnectorService,
  getConnectorListService,
} = require("../services/connectorService");

exports.createConnector = [
  async (req, res) => {
    try {
      await createConnectorService(connectorModel, req.body, res);
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:8 ~ async ~ err:", err);
    }
  },
];

exports.deleteConnector = [
  async (req, res) => {
    const { alliance_id, fan_id } = req.params;
    try {
      await deleteConnectorService(
        connectorModel,
        { alliance_id, fan_id },
        res
      );
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:19 ~ err:", err);
    }
  },
];

exports.getConnectorList = [
  async (req, res) => {
    const { id } = req.params;

    try {
      await getConnectorListService({ db: userModel, id, res });
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:41 ~ err:", err);
    }
  },
];
