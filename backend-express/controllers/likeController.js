const likedModel = require("../models/likedModel");
const {
  createFavouritifyService,
  removeFavouritifyService,
} = require("../services/favouritifyService");
const { successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.createLike = [
  async (req, res) => {
    const { snapp_id } = req.body;
    try {
      const data = { snapp_id, user_id: req.userDetails._id };
      await createFavouritifyService(likedModel, data, res);
      return successResponse({
        res,
        responseDetails: responseMessage("OK010"),
      });
    } catch (err) {
      console.log("🚀 ~ file: likeController.js:10 ~ err:", err);
    }
  },
];

exports.removeLike = [
  async (req, res) => {
    const { snapp_id } = req.params;
    try {
      const data = { snapp_id, user_id: req.userDetails._id };
      await removeFavouritifyService(likedModel, data, res);
      return successResponse({
        res,
        responseDetails: responseMessage("OK011"),
      });
    } catch (err) {
      console.log("🚀 ~ file: likeController.js:10 ~ err:", err);
    }
  },
];
