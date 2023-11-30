const { errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.createNotificationService = async (db, data) => {
  try {
    const newNotification = await db(data);
    const createdNotification = await newNotification.save();
    return createdNotification;
  } catch (err) {
    console.log(
      "🚀 ~ file: notificationService.js:5 ~ exports.createNotificationService=async ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
