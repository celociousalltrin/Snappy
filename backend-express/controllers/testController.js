const { successResponse, errorResponse } = require("../utils/responseHandler");
const { createCanvas, loadImage } = require("canvas");
const fetch = require("node-fetch");
const testModel = require("../models/testModel");

var mongoose = require("mongoose");
const { responseMessage } = require("../utils/responseMessage");
const {
  userListService,
  createUserService,
  updateUserService,
  getSingleUserService,
} = require("../services/testServices");
const {
  uploadImageService,
  deleteImageService,
} = require("../services/cloudinary");

exports.test_user_list = [
  async (req, res) => {
    try {
      var result = await userListService(testModel);
      return successResponse(res, result);
    } catch (err) {
      console.log("🚀 ~ file: testController.js:60 ~ err:", err);
      return errorResponse(res, responseMessage("ER999"));
    }
  },
];

exports.create_test_user = [
  async (req, res) => {
    try {
      const { body } = req;
      await createUserService(testModel, body);
      return res.json("It is created");
    } catch (err) {
      console.log("🚀 ~ file: testController.js:38 ~ err:", err);
      //throw error in json response with status 500.
      return errorResponse(res, err);
    }
  },
];

exports.update_test_user = [
  async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;

      const result = await updateUserService(testModel, body, id);

      return res.json(result);
    } catch (err) {
      //throw error in json response with status 500.
      return res.json(err);
    }
  },
];

exports.get_single_test_user = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getSingleUserService(id);
      return successResponse(res, result, responseMessage("OK001"));
    } catch (err) {
      return errorResponse(res, responseMessage("ER999"));
    }
  },
];

const imageCache = new Map();

exports.get_image_api = [
  async (req, res) => {
    const { image_url } = req.body;
    try {
      console.time("generateImageURL");

      const imagePromises = [];
      for (let i = 0; i < 10; i++) {
        imagePromises.push(generateImageURL(image_url));
      }

      const result = await Promise.all(imagePromises);
      console.timeEnd("generateImageURL");

      res.status(200).send(result);
    } catch (err) {
      console.log("Error:", err);
      res.status(500).send("Internal Server Error");
    }
  },
];

const generateImageURL = async (imageUrl) => {
  try {
    // Check if the image data is already in the cache
    if (imageCache.has(imageUrl)) {
      return imageCache.get(imageUrl);
    }

    const image = await loadImage(imageUrl);

    const canvas = createCanvas(800, 800);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg", 0.9);

    // Store the processed image data in the cache
    imageCache.set(imageUrl, imageData);

    return imageData;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};

exports.upload_cloudinary_test = [
  async (req, res) => {
    try {
      const result = await cloudinaryFileUpload(req.file);
      res.json(result);
    } catch (err) {
      console.log("🚀 ~ file: testController.js:193 ~ async ~ err:", err);
    }
  },
];

const cloudinaryFileUpload = async ({ buffer, mimetype }) => {
  try {
    const b64 = buffer.toString("base64");
    let dataURI = "data:" + mimetype + ";base64," + b64;
    const data = await uploadImageService(dataURI);
    return data;
  } catch (err) {
    console.log(
      "🚀 ~ file: testController.js:206 ~ cloudinaryFileUpload ~ err:",
      err
    );
  }
};

exports.delete_cloudinary_test = [
  async (req, res) => {
    try {
      const result = await deleteImageService(req.body.public_id);
      res.json("It is deleted Successfully");
    } catch (err) {
      console.log("🚀 ~ file: testController.js:197 ~ err:", err);
    }
  },
];
