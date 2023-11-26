const commentModal = require("../models/commentModal");
const notificationModel = require("../models/notificationModel");
const snappModal = require("../models/snappModal");
const {
  createCommentService,
  replyCommentService,
} = require("../services/favouritifyService");
const {
  createNotificationService,
} = require("../services/notificationService");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

const { default: mongoose } = require("mongoose");

const {
  snappDetails,
  snappReplyUserData,
} = require("../utils/mongoCommonQuery");

exports.createComment = [
  async (req, res) => {
    try {
      const { _id } = req.userDetails;
      const data = { ...req.body, user_id: _id };
      const createdComment = await createCommentService(
        commentModal,
        data,
        res
      );

      const result = await commentModal.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(createdComment._id),
          },
        },
        ...snappDetails,
      ]);

      const { user_id } = await snappModal.findById(req.body.snapp_id);
      const notificationData = {
        from_id: _id,
        to_id: user_id,
        notify_type: 2,
        is_feed_notifiy: true,
      };

      await createNotificationService(notificationModel, notificationData);

      return successResponse({
        res,
        responseDetails: responseMessage("OK012"),
        response_data: result[0],
      });
    } catch (err) {
      console.log("🚀 ~ file: commentController.js:36 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.replyComment = [
  async (req, res) => {
    try {
      const { _id } = req.userDetails;
      const createReply = await replyCommentService(
        commentModal,
        { ...req.body, reply_user_id: _id },
        res
      );
      const result = await commentModal.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(createReply._id) },
        },
        ...snappReplyUserData,
      ]);

      return successResponse({
        res,
        responseDetails: responseMessage("OK015"),
        response_data: result[0],
      });
    } catch (err) {
      console.log("🚀 ~ file: commentController.js:52 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
