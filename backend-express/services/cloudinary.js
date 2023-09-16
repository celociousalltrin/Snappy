require("dotenv").config();
var cloudinary = require("cloudinary").v2;

exports.uploadImageService = async (dataURI) => {
  try {
    const data = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image",
    });

    return resizeImageService(data);
  } catch (err) {
    console.log(
      "🚀 ~ file: cloudinary.js:5 ~ exports.uploadImageService= ~ err:",
      err
    );
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

exports.resizeImageService = async (publicId, width, height) => {
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
