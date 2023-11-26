var mongoose = require("mongoose");
const { findOneAndDelete } = require("../models/connectorModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const userModel = require("../models/userModel");
const { createNotificationService } = require("./notificationService");
const notificationModel = require("../models/notificationModel");
const {
  connectorListProject,
  connectorMatchFunction,
} = require("../utils/mongoCommonQuery");

exports.createConnectorService = async (db, connectorData, res) => {
  try {
    const newConnection = await db(connectorData);
    const result = await newConnection.save();

    const notificationData = {
      from_id: connectorData.fan_id,
      to_id: connectorData.alliance_id,
      notify_type: 4,
      is_connection_notify: true,
    };

    await createNotificationService(notificationModel, notificationData);

    return successResponse({
      res,
      responseDetails: responseMessage("OK008"),
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: connectorService.js:6 ~ exports.createConnector=async ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.deleteConnectorService = async (db, { alliance_id, fan_id }, res) => {
  try {
    const result = await db.findOneAndDelete({ alliance_id, fan_id });

    return successResponse({
      res,
      responseDetails: responseMessage("OK009"),
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: connectorService.js:29 ~ exports.deleteConnectorService ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.getConnectorListService = async ({ db, id, res, type }) => {
  try {
    let result;

    if (id) {
      result = await db.aggregate([
        {
          $match: connectorMatchFunction(type, id),
        },

        {
          $group: {
            _id: {
              $cond: {
                if: { $eq: [type, 3] },
                then: "$alliance_id",
                else: "$fan_id",
              },
            },
            ids: {
              $push: {
                $cond: {
                  if: { $eq: [type, 3] },
                  then: "$fan_id",
                  else: "$alliance_id",
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            let: {
              id: "$ids",
            },
            pipeline: [
              {
                $match: {
                  _id: { $ne: new mongoose.Types.ObjectId(id) },
                  $expr: {
                    $cond: {
                      if: { $eq: [type, 1] },
                      then: { $not: { $in: ["$_id", "$$id"] } },
                      else: { $in: ["$_id", "$$id"] },
                    },
                  },
                },
              },
            ],
            as: "connectorList",
          },
        },
        ...connectorListProject,
      ]);

      if (type === 1 && !result.length) {
        result = await userModel.find({ _id: { $ne: id } });
      }
    } else {
      result = await db.find({});
    }

    return successResponse({
      res,
      response_data: result,
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: connectorService.js:91 ~ exports.getConnectorListService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.getConnectorFavouritifyService = async ({ db, id, userId, res }) => {
  try {
    const result = await db.aggregate([
      {
        $match: {
          snapp_id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          let: {
            id: "$user_id",
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
                about: 1,
              },
            },
          ],
          as: "userData",
        },
      },
      {
        $lookup: {
          from: "connectors",
          let: {
            id: userId,
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$fan_id", "$$id"],
                },
              },
            },
          ],
          as: "alianceIds",
        },
      },
    ]);

    return successResponse({
      res,
      response_data: result.length > 0 ? result[0] : [],
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: connectorService.js:137 ~ exports.getConnectorFavouritify= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
