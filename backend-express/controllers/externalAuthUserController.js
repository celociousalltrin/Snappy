const userModel = require("../models/userModel");
const { responseMessage } = require("../utils/responseMessage");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const {
  loginExternalAuthenticatedUserService,
  externalAuthenticatedUserProfileCompletionService,
} = require("../services/externalAuthUserService");
const connectorModel = require("../models/connectorModel");

exports.loginExtrernalAuthenticatedUser = [
  async (req, res) => {
    try {
      await loginExternalAuthenticatedUserService(userModel, res, req);
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:49 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.externalAuthenticatedUserProfileCompletion = [
  async (req, res) => {
    try {
      const { body } = req;
      await externalAuthenticatedUserProfileCompletionService(
        userModel,
        body,
        res,
        req
      );

      await connectorModel.insertMany(
        body.alliances.map((o) => ({
          alliance_id: o,
          fan_id: userId,
        }))
      );
      return successResponse({
        res,
        responseDetails: responseMessage("OK004"),
      });
    } catch (err) {
      console.log("🚀 ~ file: externalAuthUserController.js:24 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
