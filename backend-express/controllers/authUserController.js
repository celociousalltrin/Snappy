var express = require("express");
const { createUserService } = require("../services/authUserService");
const { isUnique } = require("../services/validationService");

const userModel = require("../models/userModel");
const { responseMessage } = require("../utils/responseMessage");
const { errorResponse } = require("../utils/responseHandler");

exports.create_user = [
  async (req, res) => {
    try {
      const { body } = req;
      const { user_name } = req.body;

      const isUsernameExist = await isUnique(userModel, "user_name", user_name);

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
