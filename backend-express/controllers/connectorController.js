const bookmarkModel = require("../models/bookmarkModel");
const commentModal = require("../models/commentModal");
const connectorModel = require("../models/connectorModel");
const likedModel = require("../models/likedModel");
const userModel = require("../models/userModel");
const {
  createConnectorService,
  deleteConnectorService,
  getConnectorListService,
  getConnectorFavouritifyService,
} = require("../services/connectorService");
const { getDbBasedOnType } = require("../utils/mongoCommonQuery");

exports.createConnector = [
  async (req, res) => {
    const { _id } = req.userDetails;
    const { alliance_id } = req.body;
    try {
      await createConnectorService(
        connectorModel,
        { alliance_id, fan_id: _id },
        res
      );
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:8 ~ async ~ err:", err);
    }
  },
];

exports.deleteConnector = [
  async (req, res) => {
    const { alliance_id } = req.params;
    const { _id } = req.userDetails;
    try {
      await deleteConnectorService(
        connectorModel,
        { alliance_id, fan_id: _id },
        res
      );
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:19 ~ err:", err);
    }
  },
];

exports.getConnectorList = [
  async (req, res) => {
    const { _id } = req.userDetails;

    try {
      await getConnectorListService({
        db: connectorModel,
        id: _id,
        res,
        type: 1,
      });
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:41 ~ err:", err);
    }
  },
];

exports.getConnectorAllianceList = [
  async (req, res) => {
    const { _id } = req.userDetails;

    try {
      await getConnectorListService({
        db: connectorModel,
        id: _id,
        res,
        type: 2,
      });
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:41 ~ err:", err);
    }
  },
];

exports.getConnectorFanList = [
  async (req, res) => {
    const { _id } = req.userDetails;

    try {
      await getConnectorListService({
        db: connectorModel,
        id: _id,
        res,
        type: 3,
      });
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:41 ~ err:", err);
    }
  },
];

exports.getConnectorBasedOnFavouritify = [
  async (req, res) => {
    const { snapp_id, type } = req.params;

    const { _id } = req.userDetails;

    try {
      await getConnectorFavouritifyService({
        db: getDbBasedOnType(parseInt(type)),
        id: snapp_id,
        userId: _id,
        res,
      });
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:98 ~ err:", err);
    }
  },
];
