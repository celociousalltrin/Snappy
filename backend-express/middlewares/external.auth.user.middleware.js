const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const { tokenVerification } = require("../utils/commonFunction");

module.exports = async (req, res, next) => {
  try {
    const refreshToken = req?.cookies?.refresh_token;

    if (!refreshToken) {
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });
    }
    const refreshTokenVerify = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => tokenVerification(err, decoded, "refreshToken", req)
    );

    if (
      refreshTokenVerify === "JsonWebTokenError" ||
      refreshTokenVerify.refresh_token_expired
    ) {
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });
    }

    req.user_email = refreshTokenVerify.user_email;
    next();
  } catch (err) {
    console.log(
      "🚀 ~ file: external.auth.user.middleware.js:10 ~ module.exports= ~ err:",
      err
    );
  }
};
