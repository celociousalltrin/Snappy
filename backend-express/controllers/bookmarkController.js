const bookmarkModel = require("../models/bookmarkModel");
const { successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.createBookmark = [
  async (req, res) => {
    const { snapp_id } = req.body;
    try {
      const data = { snapp_id, user_id: req.userDetails._id };
      await createFavouritifyService(bookmarkModel, data, res);
      return successResponse({
        res,
        responseDetails: responseMessage("OK013"),
      });
    } catch (err) {
      console.log("🚀 ~ file: likeController.js:10 ~ err:", err);
    }
  },
];

exports.removeBookmark = [
  async (req, res) => {
    const { snapp_id } = req.params;
    try {
      const data = { snapp_id, user_id: req.userDetails._id };
      await removeFavouritifyService(bookmarkModel, data, res);
      return successResponse({
        res,
        responseDetails: responseMessage("OK014"),
      });
    } catch (err) {
      console.log("🚀 ~ file: likeController.js:10 ~ err:", err);
    }
  },
];
