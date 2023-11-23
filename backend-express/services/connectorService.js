var mongoose = require("mongoose");
const { findOneAndDelete } = require("../models/connectorModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.createConnectorService = async (db, connectorData, res) => {
  try {
    const newConnection = await db(connectorData);
    const result = await newConnection.save();

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
      responseDetails: responseMessage("OK008"),
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: connectorService.js:29 ~ exports.deleteConnectorService ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.getConnectorListService = async ({ db, id, res }) => {
  try {
    let result;

    if (id) {
      result = await db.aggregate([
        {
          $match: {
            fan_id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: "$fan_id",
            alliance_ids: {
              $push: "$alliance_id",
            },
          },
        },
        {
          $lookup: {
            from: "users",
            let: {
              id: "$alliance_ids",
            },
            pipeline: [
              {
                $match: {
                  _id: { $ne: new mongoose.Types.ObjectId(id) },
                },
              },
            ],
            as: "connectorsList",
          },
        },
        {
          $project: {
            _id: 0,
            connectorsList: 1,
          },
        },
      ]);
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
