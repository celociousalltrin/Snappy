const userModel = require("../models/userModel");
const { responseMessage } = require("../utils/responseMessage");
const { errorResponse } = require("../utils/responseHandler");
const {
  loginExternalAuthenticatedUserService,
  externalAuthenticatedUserProfileCompletionService,
} = require("../services/externalAuthUserService");

exports.loginExtrernalAuthenticatedUser = [
  async (req, res) => {
    try {
      await loginExternalAuthenticatedUserService(userModel, res, req);
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:49 ~ err:", err);
      return errorResponse(res, responseMessage("ER999"));
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
    } catch (err) {
      console.log("🚀 ~ file: externalAuthUserController.js:24 ~ err:", err);
      return errorResponse(res, responseMessage("ER999"));
    }
  },
];
