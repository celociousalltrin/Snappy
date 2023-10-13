const { errorResponse, successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const { uploadImageService } = require("./cloudinary");
const bcrypt = require("bcryptjs");

const {
  generateAccessToken,
  assignRefreshTokeninCookie,
  tokenVerification,
} = require("../utils/commonFunction.js");

const passwordHashing = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

exports.createUserService = async (db, userData) => {
  try {
    const { user_name, confirm_password, user_data_url, friends, ...rest } =
      userData;
    const cloudinaryImage = await uploadImageService(user_data_url);

    const hassedPassword = passwordHashing(confirm_password);

    const newUser = await db({
      ...rest,
      user_image: cloudinaryImage,
      password: hassedPassword,
      user_name,
    });
    await newUser.save();
  } catch (err) {
    console.log(
      "🚀 ~ file: userService.js:5 ~ exports.createUserService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.createExtrernalAuthenticatedUserService = async (db, userData) => {
  try {
    const cloudinaryImage = await uploadImageService(userData.user_data_url);
    const newUser = await db({
      ...userData,
      user_image: cloudinaryImage,
      is_external_authenticated_user: true,
    });
    await newUser.save();
  } catch (err) {
    console.log(
      "🚀 ~ file: authUserService.js:92 ~ exports.createExtrernalAuthenticatedUserService= ~ err:",
      err
    );
  }
};

exports.loginService = async (db, userData, res) => {
  try {
    const { email, password } = userData;
    const getUser = await db.findOne({
      email,
    });

    if (!getUser) return errorResponse(res, responseMessage("ER003"), 404);

    const {
      email: user_email,
      user_name,
      first_name,
      last_name,
      user_image: { public_id },
      is_external_authenticated_user,
    } = getUser;

    const hash = bcrypt.compareSync(password, getUser.password);

    if (!hash) return errorResponse(res, responseMessage("ER004"), 404);

    assignRefreshTokeninCookie(res, { user_email });

    const result = {
      user_name,
      user_email,
      first_name,
      last_name,
      public_id,
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
      "🚀 ~ file: authUserService.js:39 ~ exports.loginService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
