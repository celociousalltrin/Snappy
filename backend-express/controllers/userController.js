const userModel = require("../models/userModel");
const { createUserService } = require("../services/testServices");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.create_user = [
  async (req, res) => {
    const { body } = req;
    try {
      await createUserService(userModel, body);
      return successResponse({
        res,
        responseDetails: responseMessage("OK001"),
      });
    } catch (err) {
      console.log("🚀 ~ file: userController.js:13 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
