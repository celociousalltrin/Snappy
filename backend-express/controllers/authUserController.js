var express = require("express");
const {
  createUserService,
  loginService,
} = require("../services/authUserService");
const { isValid } = require("../services/validationService");

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
const {
  getConnectorListService,
  createConnectorService,
  deleteConnectorService,
} = require("../services/connectorService");
const connectorModel = require("../models/connectorModel");

exports.create_user = [
  async (req, res) => {
    try {
      const { body } = req;
      const { user_name } = req.body;

      const isUsernameExist = await isValid(userModel, "user_name", user_name);

      if (isUsernameExist) {
        return errorResponse({
          res,
          responseDetails: responseMessage("ER002"),
          status: 422,
        });
      }

      const userId = await createUserService(userModel, body);

      await connectorModel.insertMany(
        body.alliances.map((o) => ({
          alliance_id: o,
          fan_id: userId,
        }))
      );

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
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
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
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
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

exports.getSignUpConnectorsList = [
  async (req, res) => {
    try {
      await getConnectorListService({
        db: userModel,
        res,
      });
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:76 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.createSignupConnector = [
  async (req, res) => {
    try {
      await createConnectorService(connectorModel, req.body, res);
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:8 ~ async ~ err:", err);
    }
  },
];

exports.deleteSignupConnector = [
  async (req, res) => {
    const { alliance_id, fan_id } = req.params;
    try {
      await deleteConnectorService(
        connectorModel,
        { alliance_id, fan_id },
        res
      );
    } catch (err) {
      console.log("🚀 ~ file: connectorController.js:19 ~ err:", err);
    }
  },
];
