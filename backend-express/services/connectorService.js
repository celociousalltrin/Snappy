var mongoose = require("mongoose");
const { findOneAndDelete } = require("../models/connectorModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const userModel = require("../models/userModel");

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

const connectorListProject = [
  {
    $unwind: {
      path: "$connectorList",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      _id: 0,
      _id: "$connectorList._id",
      first_name: "$connectorList.first_name",
      last_name: "$connectorList.last_name",
      user_image: "$connectorList.user_image",
      user_name: "$connectorList.user_name",
      about: "$connectorList.about",
    },
  },
];

const connectorMatchFunction = (type, id) => {
  if (type === 3) {
    return { alliance_id: new mongoose.Types.ObjectId(id) };
  } else {
    return { fan_id: new mongoose.Types.ObjectId(id) };
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
