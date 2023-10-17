const nodemailer = require("nodemailer");
const { responseMessage } = require("../utils/responseMessage");
const { successResponse, errorResponse } = require("../utils/responseHandler");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    clientId: process.env.MAIL_OAUTH_CLIENT_ID,
    clientSecret: process.env.MAIL_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.MAIL_OAUTH_REFRESH_TOKEN,
  },
});

exports.sendEmailService = async (mailOption, res) => {
  try {
    transporter.sendMail(mailOption, function (err, data) {
      console.log("🚀 ~ file: emailServices.js:19 ~ data:", data);
      if (err) {
        console.log("Error " + err);
        return errorResponse({
          res,
          responseDetails: responseMessage("ER005"),
        });
      } else {
        return successResponse({
          res,
          responseDetails: responseMessage("OK005"),
        });
      }
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: emailServices.js:35 ~ exports.sendEmail= ~ err:",
      err
    );
    return errorResponse(res, responseMessage("ER999"));
  }
};
