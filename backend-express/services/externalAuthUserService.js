const {
  assignRefreshTokeninCookie,
  generateAccessToken,
} = require("../utils/commonFunction");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.loginExternalAuthenticatedUserService = async (db, res, req) => {
  const { user_email } = req;
  console.log(
    "🚀 ~ file: externalAuthUserService.js:10 ~ exports.loginExternalAuthenticatedUserService= ~ user_email:",
    user_email
  );

  const {
    user_name,
    is_external_authenticated_user,
    user_image: { public_id },
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
    user_name: "",
    user_email,
    public_id,
    is_external_authenticated_user,
    access_token: generateAccessToken({ user_email }),
  };
  return successResponse({
    res,
    responseDetails: responseMessage("OK002"),
    response_data: result,
  });
};

exports.externalAuthenticatedUserProfileCompletionService = async (
  db,
  body,
  res,
  req
) => {
  const { user_email: email } = req;
  await db.findOneAndUpdate({ email }, { ...body });

  return successResponse({
    res,
    responseDetails: responseMessage("OK004"),
  });
};
