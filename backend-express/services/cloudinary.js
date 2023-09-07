require("dotenv").config();
var cloudinary = require("cloudinary").v2;

exports.uploadImageService = async (dataURI) => {
  try {
    const data = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image",
      public_id: "new image",
    });
    return data;
  } catch (err) {
    console.log(
      "🚀 ~ file: cloudinary.js:5 ~ exports.uploadImageService= ~ err:",
      err
    );
  }
};

exports.deleteImageService = async (publicId) => {
  try {
    const data = await cloudinary.uploader.destroy("new image", {
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
