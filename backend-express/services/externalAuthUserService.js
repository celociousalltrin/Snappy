const {
  assignRefreshTokeninCookie,
  generateAccessToken,
} = require("../utils/commonFunction");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.loginExternalAuthenticatedUserService = async (db, res, req) => {
  try {
    const { user_email } = req;

    const {
      user_name,
      is_external_authenticated_user,
      user_image,
      _id,
      first_name,
    } = await db.findOne({
      email: user_email,
    });

    if (!user_name) {
      return errorResponse({
        res,
        status: 422,
      });
    }

    assignRefreshTokeninCookie(res, { user_email });

    const result = {
      first_name,
      user_name,
      user_email,
      user_image,
      user_id: _id,
      is_external_authenticated_user,
      access_token: generateAccessToken({ user_email }),
    };
    return successResponse({
      res,
      responseDetails: responseMessage("OK002"),
      response_data: result,
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: externalAuthUserService.js:42 ~ exports.loginExternalAuthenticatedUserService= ~ err:",
      err
    );
  }
};

exports.externalAuthenticatedUserProfileCompletionService = async (
  db,
  body,
  res,
  req
) => {
  try {
    const { user_email: email } = req;
    const { _id } = await db.findOneAndUpdate({ email }, { ...body });
    return _id;
  } catch (err) {
    console.log("🚀 ~ file: externalAuthUserService.js:58 ~ err:", err);
  }
};
