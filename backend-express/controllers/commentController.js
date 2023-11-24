const commentModel = require("../models/commentModal");
const {
  createCommentService,
  replyCommentService,
} = require("../services/favouritifyService");
const { successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.createComment = [
  async (req, res) => {
    try {
      const data = { ...req.body, user_id: req.userDetails._id };
      const result = await createCommentService(likedModel, data, res);
      return successResponse({
        res,
        responseDetails: responseMessage("OK012"),
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: likeController.js:10 ~ err:", err);
    }
  },
];

exports.replyComment = [
  async (req, res) => {
    try {
      const result = await replyCommentService(likedModel, req.body, res);
      return successResponse({
        res,
        responseDetails: responseMessage("OK015"),
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: likeController.js:10 ~ err:", err);
    }
  },
];
