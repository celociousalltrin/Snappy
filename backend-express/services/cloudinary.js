const { errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

require("dotenv").config();
var cloudinary = require("cloudinary").v2;

exports.uploadImageService = async ({
  data_uri,
  is_resize = false,
  sub_folder,
}) => {
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      data_uri,
      {
        resource_type: "image",
        folder: `Snappy/${sub_folder}`,
      }
    );

    return is_resize
      ? resizeImageService(public_id)
      : { public_id, secure_url };
  } catch (err) {
    console.log(
      "🚀 ~ file: cloudinary.js:5 ~ exports.uploadImageService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.deleteImageService = async (publicId) => {
  try {
    const data = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return data;
  } catch (err) {
    console.log(
      "🚀 ~ file: cloudinary.js:22 ~ exports.deleteImage ~ err:",
      err
    );
  }
};

exports.resizeImageService = async (publicId, width = 100, height = 100) => {
  try {
    const resizedImageUrl = cloudinary.url(publicId, {
      width,
      height,
      crop: "fill",
      secure: true,
    });

    return resizedImageUrl;
  } catch (err) {
    console.log(
      "🚀 ~ file: cloudinary.js:44 ~ exports.resizeImageService=async ~ err:",
      err
    );
  }
};
