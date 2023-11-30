const notificationModel = require("../models/notificationModel");
const {
  createNotificationService,
} = require("../services/notificationService");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.createNotification = [
  async (req, res) => {
    const { _id } = req.userDetails;
    try {
      await createNotificationService(
        notificationModel,
        {
          ...req.body,
          from_id: _id,
        },
        res
      );
      return successResponse({
        res,
        responseDetails: responseMessage("OK016"),
        new_access_token: req.new_access_token,
      });
    } catch (err) {
      console.log("🚀 ~ file: notificationController.js:7 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

const getNofication = (type, to_id) => {
  switch (type) {
    case "all":
      return { to_id };
    case "feeds":
      return { is_feed_notifiy: true, to_id };
    case "connections":
      return { is_connection_notify: true, to_id };
  }
};

exports.getNotificationList = [
  async (req, res) => {
    try {
      const { notify } = req.params;
      const { _id } = req.userDetails;

      const result = await notificationModel.aggregate([
        {
          $match: getNofication(notify, _id),
        },
        {
          $lookup: {
            from: "users",
            let: {
              id: "$from_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$id"],
                  },
                },
              },
              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  user_name: 1,
                  user_image: 1,
                },
              },
            ],
            as: "userData",
          },
        },
        {
          $unwind: {
            path: "$userData",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      return successResponse({
        res,
        responseDetails: responseMessage("OK019"),
        response_data: result,
        new_access_token: req.new_access_token,
      });
    } catch (err) {
      console.log("🚀 ~ file: notificationController.js:30 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
exports.readNotification = [
  async (req, res) => {
    const { _id } = req.body;
    console.log("🚀 ~ file: notificationController.js:99 ~ _id:", _id);
    try {
      const result = await notificationModel.findByIdAndUpdate(
        { _id },
        { is_read: true }
      );
      return successResponse({
        res,
        responseDetails: responseMessage("OK017"),
        new_access_token: req.new_access_token,
      });
    } catch (err) {
      console.log(
        "🚀 ~ file: notificationController.js:25 ~ async ~ err:",
        err
      );
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.clearnotification = [
  async (req, res) => {
    const idsToDelete = req.query.ids.split(",");
    try {
      const result = await notificationModel.deleteMany({
        _id: { $in: idsToDelete },
      });
      return successResponse({
        res,
        responseDetails: responseMessage("OK018"),
        new_access_token: req.new_access_token,
      });
    } catch (err) {
      console.log("🚀 ~ file: notificationController.js:52 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.clearSingleNotification = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await notificationModel.findOneAndDelete({ _id: id });

      return successResponse({
        res,
        responseDetails: responseMessage("OK020"),
        new_access_token: req.new_access_token,
      });
    } catch (err) {
      console.log(
        "🚀 ~ file: notificationController.js:141 ~ async ~ err:",
        err
      );
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
