const { errorResponse, successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const { uploadImageService } = require("./cloudinary");
const bcrypt = require("bcryptjs");

const {
  generateAccessToken,
  assignRefreshTokeninCookie,
  dataHashing,
} = require("../utils/commonFunction.js");

exports.createUserService = async (db, userData) => {
  try {
    const { user_name, confirm_password, user_data_url, friends, ...rest } =
      userData;
    const cloudinaryImage = await uploadImageService({
      data_uri: user_data_url,
      sub_folder: "user",
    });

    const hassedPassword = dataHashing(confirm_password);

    const newUser = await db({
      ...rest,
      user_image: cloudinaryImage,
      password: hassedPassword,
      user_name,
    });
    const { _id } = await newUser.save();

    return _id;
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
    const cloudinaryImage = await uploadImageService({
      data_uri: userData.user_data_url,
      sub_folder: "user",
    });
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

    if (!getUser)
      return errorResponse({
        res,
        responseDetails: responseMessage("ER003"),
        status: 404,
      });

    const {
      email: user_email,
      user_name,
      first_name,
      last_name,
      user_image,
      is_external_authenticated_user,
      _id,
    } = getUser;

    const hash = bcrypt.compareSync(password, getUser.password);

    if (!hash)
      return errorResponse({
        res,
        responseDetails: responseMessage("ER004"),
        status: 404,
      });

    assignRefreshTokeninCookie(res, { user_email });

    const result = {
      user_name,
      user_email,
      first_name,
      last_name,
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
      "🚀 ~ file: authUserService.js:39 ~ exports.loginService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
