const likedModel = require("../models/likedModel");
const notificationModel = require("../models/notificationModel");
const snappModal = require("../models/snappModal");
const {
  createFavouritifyService,
  removeFavouritifyService,
} = require("../services/favouritifyService");
const {
  createNotificationService,
} = require("../services/notificationService");
const { successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.createLike = [
  async (req, res) => {
    const { snapp_id } = req.body;
    const { _id } = req.userDetails;
    try {
      const data = { snapp_id, user_id: _id };
      await createFavouritifyService(likedModel, data, res);

      const { user_id } = await snappModal.findById(snapp_id);
      const notificationData = {
        from_id: _id,
        to_id: user_id,
        notify_type: 1,
        is_feed_notifiy: true,
      };

      await createNotificationService(notificationModel, notificationData);

      return successResponse({
        res,
        new_access_token: req.new_access_token,
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
        new_access_token: req.new_access_token,
        responseDetails: responseMessage("OK011"),
      });
    } catch (err) {
      console.log("🚀 ~ file: likeController.js:10 ~ err:", err);
    }
  },
];
