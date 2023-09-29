const userModel = require("../models/userModel");
const { isUnique } = require("../services/validationService");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.signupFormUserNameValidation = [
  async (req, res) => {
    try {
      const { user_name } = req.body;

      const isUsernameExist = await isUnique(userModel, "user_name", user_name);

      return successResponse(res, responseMessage(), isUsernameExist);
    } catch (err) {
      console.log("🚀 ~ file: validationController.js:6 ~ err:", err);
      return errorResponse(res, responseMessage("ER999"));
    }
  },
];