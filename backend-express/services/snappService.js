const { errorResponse, successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const { uploadImageService } = require("./cloudinary");

exports.createSnappService = async (db, snappData, res) => {
  try {
    const { id, data, image_url = null } = snappData;

    if (image_url) {
      var cloudinaryImage = await uploadImageService({
        data_uri: image_url,
        sub_folder: "snapps",
      });
    }
    const newSnapp = await db({
      user_id: id,
      data,
      ...(image_url && { snapp_image: cloudinaryImage }),
    });
    await newSnapp.save();
    return successResponse({
      res,
      responseDetails: responseMessage("OK007"),
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: snappService.js:22 ~ exports.createSnappService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};