const snappModal = require("../models/snappModal");
const { createSnappService } = require("../services/snappService");
const { isValid } = require("../services/validationService");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.get_snapp = [
  async (req, res) => {
    try {
      return successResponse({
        res,
        new_access_token: req.new_access_token,
        response_data: { name: "SADasdas" },
      });
    } catch (err) {
      console.log("🚀 ~ file: snappController.js:12 ~ err:", err);
    }
  },
];

exports.create_snapp = [
  async (req, res) => {
    try {
      const { body, user_id } = req;

      const isSnappLimitReached = await isValid(
        snappModal,
        "user_id",
        user_id,
        3
      );

      if (isSnappLimitReached) {
        return errorResponse({
          res,
          responseDetails: responseMessage("ER008"),
          status: 403,
        });
      }
      const { url = null } = body.find((o) => o.type === "image") || {};

      const feedData = body.filter((o) => o.type !== "image");

      const snappData = {
        id: user_id,
        data: feedData,
        ...(url && { image_url: url }),
      };

      await createSnappService(snappModal, snappData, res);
    } catch (err) {
      console.log("🚀 ~ file: snappController.js:21 ~ err:", err);
    }
  },
];
