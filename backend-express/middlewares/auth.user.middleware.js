const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const { generateAccessToken } = require("../utils/commonFunction");

module.exports = async (req, res, next) => {
  try {
    const { authorization, snappy_user_name } = req.headers;
    const access_token = authorization?.split(" ")[1];

    const refresh_token = req?.cookies?.refresh_token;

    if (!access_token)
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });
    if (!refresh_token)
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });

    const accessTokenVerify = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) =>
        tokenVerification(
          err,
          decoded,
          "accessToken",
          snappy_user_name,
          req,
          res
        )
    );

    const refreshTokenVerify = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) =>
        tokenVerification(
          err,
          decoded,
          "refreshToken",
          snappy_user_name,
          req,
          res
        )
    );

    if (
      accessTokenVerify === "JsonWebTokenError" ||
      refreshTokenVerify === "JsonWebTokenError" ||
      refreshTokenVerify.refresh_token_expired
    ) {
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });
    }

    next();
  } catch (err) {
    console.log(
      "🚀 ~ file: auth.user.middleware.js:5 ~ module.exports= ~ err:",
      err
    );
  }
};

const tokenVerification = (err, decoded, token, user_name, req, res) => {
  switch (err?.name) {
    case "JsonWebTokenError":
      return err?.name;
    case "TokenExpiredError":
      if (token === "accessToken") {
        req.new_access_token = generateAccessToken({ user_name });
      } else {
        return { refresh_token_expired: true };
      }
      return { is_expired: true };
    default:
      return decoded;
  }
};
