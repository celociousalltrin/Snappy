const { successResponse } = require("../utils/responseHandler");

exports.get_feed = [
  async (req, res) => {
    try {
      return successResponse({
        res,
        new_access_token: req.new_access_token,
        response_data: { name: "SADasdas" },
      });
    } catch (err) {
      console.log("🚀 ~ file: feedController.js:6 ~ async ~ err:", err);
    }
  },
];
