const userModel = require("../models/userModel");
const {
  uploadImageService,
  deleteImageService,
} = require("../services/cloudinary");
const { getUserService } = require("../services/userService");
const { dataHashing } = require("../utils/commonFunction");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const bcrypt = require("bcryptjs");

exports.updateUser = [
  async (req, res) => {
    const { _id } = req.userDetails;
    const {
      user_banner_image_uri,
      user_image_uri,
      old_user_image_public_id,
      old_banner_image_public_id,
      ...rest
    } = req.body;

    try {
      if (user_image_uri) {
        var userCloudinaryImage = await uploadImageService({
          data_uri: user_image_uri,
          sub_folder: "user",
        });

        await deleteImageService(old_user_image_public_id);
      }

      if (user_banner_image_uri) {
        var userBannerCloudinaryImage = await uploadImageService({
          data_uri: user_banner_image_uri,
          sub_folder: "user/banner",
        });
        {
          old_banner_image_public_id &&
            (await deleteImageService(old_banner_image_public_id));
        }
      }

      const data = {
        ...rest,
        ...(user_banner_image_uri && {
          user_banner_image: userBannerCloudinaryImage,
        }),
        ...(user_image_uri && { user_image: userCloudinaryImage }),
      };

      const result = await userModel.findOneAndUpdate(
        { _id },
        { ...data },
        { new: true }
      );
      return successResponse({
        res,
        response_data: result,
        responseDetails: responseMessage("OK021"),
      });
    } catch (err) {
      console.log("🚀 ~ file: userController.js:7 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.getUser = [
  async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await getUserService(userModel, userId);
      return successResponse({
        res,
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: userController.js:15 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.changeUserPassword = [
  async (req, res) => {
    const { password, _id } = req.userDetails;
    const { old_password, new_password } = req.body;
    try {
      const hash = bcrypt.compareSync(old_password, password);
      if (!hash)
        return errorResponse({
          res,
          responseDetails: responseMessage("ER009"),
        });

      const hassedPassword = dataHashing(new_password);
      await userModel.findOneAndUpdate({ _id }, { password: hassedPassword });
      return successResponse({
        res,
        responseDetails: responseMessage("OK022"),
      });
    } catch (err) {
      console.log("🚀 ~ file: userController.js:64 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.getUserBasedOnSearch = [
  async (req, res) => {
    const { search } = req.params;
    try {
      const result = await userModel
        .find({
          $or: [
            { first_name: { $regex: new RegExp(search, "i") } },
            { last_name: { $regex: new RegExp(search, "i") } },
          ],
        })
        .select("user_name _id")
        .limit(10)
        .lean()
        .exec();

      return successResponse({
        res,
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: userController.js:64 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
