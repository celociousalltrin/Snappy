var express = require("express");
const {
  createUserService,
  loginService,
} = require("../services/authUserService");
const { isExist } = require("../services/validationService");

const userModel = require("../models/userModel");
const { responseMessage } = require("../utils/responseMessage");
const { errorResponse, successResponse } = require("../utils/responseHandler");

exports.create_user = [
  async (req, res) => {
    try {
      const { body } = req;
      const { user_name } = req.body;

      const isUsernameExist = await isExist(userModel, "user_name", user_name);

      if (isUsernameExist)
        return errorResponse(res, responseMessage("ER002"), 422);

      await createUserService(userModel, body);
      return res.json("It is created Successfully");
    } catch (err) {
      console.log("🚀 ~ file: auth-user.js:9 ~ async ~ err:", err);
      return errorResponse(res, responseMessage("ER999"));
    }
  },
];

exports.login = [
  async (req, res) => {
    try {
      const { body } = req;
      await loginService(userModel, body, res);
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:34 ~ asyn ~ err:", err);
      return errorResponse(res, responseMessage("ER999"));
    }
  },
];
