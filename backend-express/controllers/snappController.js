const connectorModel = require("../models/connectorModel");

const snappModal = require("../models/snappModal");

const {
  createSnappService,
  getSnappBasedOnConnectorsService,
  getSnapps,
  getSingleSnappService,
  getUserBasedFavouritifySnappsService,
  getUserSnappsService,
} = require("../services/snappService");
const { isValid } = require("../services/validationService");
const {
  snappLikes,
  snappBookmarks,
  getDbBasedOnType,
} = require("../utils/mongoCommonQuery");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.get_snapps = [
  async (req, res) => {
    const { _id } = req.userDetails;
    const { type } = req.params;

    try {
      let result;
      if (type === "connectors") {
        result = await getSnappBasedOnConnectorsService(connectorModel, _id);
      } else {
        result = await getSnapps(snappModal, _id);
      }

      return successResponse({
        res,
        new_access_token: req.new_access_token,
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: snappController.js:12 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.getUserBasedFavouritifySnapps = [
  async (req, res) => {
    const { type, user_id } = req.params;

    try {
      const result = await getUserBasedFavouritifySnappsService(
        getDbBasedOnType(parseInt(type)),
        user_id,
        type
      );
      return successResponse({
        res,
        new_access_token: req.new_access_token,
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: snappController.js:44 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.getUserSnapps = [
  async (req, res) => {
    const { user_id } = req.params;
    try {
      const result = await getUserSnappsService(snappModal, user_id);
      return successResponse({
        res,
        new_access_token: req.new_access_token,
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: snappController.js:44 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.get_single_snapp = [
  async (req, res) => {
    const { snapp_id } = req.params;
    const { _id } = req.userDetails;
    try {
      const result = await getSingleSnappService(snappModal, snapp_id, _id);

      return successResponse({
        res,
        new_access_token: req.new_access_token,
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: snappController.js:45 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.create_snapp = [
  async (req, res) => {
    try {
      const {
        body,
        userDetails: { _id },
      } = req;

      const isSnappLimitReached = await isValid(snappModal, "user_id", _id, 3);

      if (isSnappLimitReached) {
        return errorResponse({
          res,
          responseDetails: responseMessage("ER008"),
          status: 403,
        });
      }
      const { url = null } = body.find((o) => o.type === "image") || {};

      const feedData = body.filter((o) => o.type !== "image");

      const snappData = {
        id: _id,
        data: feedData,
        ...(url && { image_url: url }),
      };

      await createSnappService(snappModal, snappData, res);
    } catch (err) {
      console.log("🚀 ~ file: snappController.js:21 ~ err:", err);
    }
  },
];
