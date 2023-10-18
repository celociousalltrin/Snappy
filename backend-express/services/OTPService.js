const otpModel = require("../models/otpModel");
const { dataHashing, dateInMilliseconds } = require("../utils/commonFunction");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const bcrypt = require("bcryptjs");

exports.createOTPService = async ({
  err,
  res,
  data: { otp, email, issued_for },
}) => {
  try {
    if (err) {
      console.log("Error " + err);
      return errorResponse({
        res,
        responseDetails: responseMessage("ER005"),
      });
    } else {
      const hashedOTP = dataHashing(otp);
      const newOTP = await otpModel({
        otp: hashedOTP,
        ref_user_email: email,
        issued_for,
        expiry_at: new Date(Date.now() + dateInMilliseconds(6)),
      });
      await newOTP.save();
      return successResponse({
        res,
        responseDetails: responseMessage("OK005"),
      });
    }
  } catch (err) {
    console.log("🚀 ~ file: OTPService.js:6 ~ exports.createOTP= ~ err:", err);
    return errorResponse(res, responseMessage("ER999"));
  }
};

exports.verifyOTPService = async (res, { email, issued_for, otp }) => {
  try {
    const getOTPDocument = await otpModel
      .aggregate([
        {
          $match: {
            ref_user_email: email,
            issued_for,
          },
        },
        {
          $sort: {
            issued_at: -1,
          },
        },
      ])
      .limit(1);

    if (!getOTPDocument.length) {
      return errorResponse({ res, responseDetails: responseMessage("ER006") });
    }
    const hash = bcrypt.compareSync(otp, getOTPDocument[0].otp);

    if (!hash) {
      return errorResponse({
        res,
        responseDetails: responseMessage("ER007"),
        status: 400,
      });
    }

    return successResponse({
      res,
      responseDetails: responseMessage("OK006"),
      response_data: { is_otp_verified: true },
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: OTPService.js:47 ~ exports.verifyOTPService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
