const { errorResponse, successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const { uploadImageService } = require("./cloudinary");
const bcrypt = require("bcryptjs");

const {
  generateAccessToken,
  generateRefreshToken,
  assignRefreshTokeninCookie,
} = require("../utils/commonFunction.js");

const passwordHashing = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

exports.createUserService = async (db, userData) => {
  try {
    const { user_name, confirm_password, investor_data_url, friends, ...rest } =
      userData;
    const cloudinaryImage = await uploadImageService(investor_data_url);

    const hassedPassword = passwordHashing(confirm_password);

    const newUser = await db({
      ...rest,
      investor_image: cloudinaryImage,
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

exports.loginService = async (db, userData, res) => {
  try {
    const { email, password } = userData;
    const getUser = await db.findOne({
      email,
    });

    if (!getUser) return errorResponse(res, responseMessage("ER003"), 404);

    const {
      user_name,
      first_name,
      last_name,
      investor_image: { public_id },
    } = getUser;

    const hash = bcrypt.compareSync(password, getUser.password);

    if (!hash) return errorResponse(res, responseMessage("ER004"), 404);

    assignRefreshTokeninCookie(res, { user_name });

    const result = {
      user_name,
      first_name,
      last_name,
      public_id,
      access_token: generateAccessToken({ user_name }),
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
