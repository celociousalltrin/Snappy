const userModel = require("../models/userModel");
const { isValid } = require("../services/validationService");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.signupFormUserNameValidation = [
  async (req, res) => {
    try {
      const { user_name } = req.body;

      const isUsernameExist = await isValid(userModel, "user_name", user_name);

      return successResponse({ res, response_data: isUsernameExist });
    } catch (err) {
      console.log("🚀 ~ file: validationController.js:6 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
exports.signupFormEmailValidation = [
  async (req, res) => {
    try {
      const { email } = req.body;

      const isEmailExist = await isValid(userModel, "email", email);

      return successResponse({ res, response_data: isEmailExist });
    } catch (err) {
      console.log("🚀 ~ file: validationController.js:6 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
