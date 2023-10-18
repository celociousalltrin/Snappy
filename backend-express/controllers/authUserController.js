var express = require("express");
const {
  createUserService,
  loginService,
} = require("../services/authUserService");
const { isExist } = require("../services/validationService");

const userModel = require("../models/userModel");
const { responseMessage } = require("../utils/responseMessage");
const { errorResponse } = require("../utils/responseHandler");
const { sendEmailService } = require("../services/emailServices");
const { OtpGenerator } = require("../utils/commonFunction");
const {
  emailVerificationMailOptions,
} = require("../utils/nodeMailerMailOptions");
const {
  createOTPService,
  verifyOTPService,
} = require("../services/OTPService");

exports.create_user = [
  async (req, res) => {
    try {
      const { body } = req;
      const { user_name } = req.body;

      const isUsernameExist = await isExist(userModel, "user_name", user_name);

      if (isUsernameExist)
        return errorResponse({
          res,
          responseDetails: responseMessage("ER002"),
          status: 422,
        });

      await createUserService(userModel, body);
      return res.json("It is created Successfully");
    } catch (err) {
      console.log("🚀 ~ file: auth-user.js:9 ~ async ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
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

exports.generateEmailVerificationOTP = [
  async (req, res) => {
    try {
      const { email, name, issued_for } = req.body;
      const otp = OtpGenerator();
      const mailOption = emailVerificationMailOptions(otp, email, name);
      await sendEmailService(mailOption, res, createOTPService, {
        email,
        otp,
        issued_for,
      });
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:49 ~ err:", err);
      return errorResponse(res, responseMessage("ER999"));
    }
  },
];

exports.verifyEmailVerificationOTP = [
  async (req, res) => {
    try {
      await verifyOTPService(res, req.body);
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:76 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
