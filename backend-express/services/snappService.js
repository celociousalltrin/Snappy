var mongoose = require("mongoose");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const { uploadImageService } = require("./cloudinary");
const {
  snappBookmarks,
  snappDetails,
  snappLikes,
  snappMetaCount,
  snappReplyUserData,
} = require("../utils/mongoCommonQuery");

exports.createSnappService = async (db, snappData, res) => {
  try {
    const { id, data, image_url = null } = snappData;

    if (image_url) {
      var cloudinaryImage = await uploadImageService({
        data_uri: image_url,
        sub_folder: "snapps",
      });
    }
    const newSnapp = await db({
      user_id: id,
      data,
      ...(image_url && { snapp_image: cloudinaryImage }),
    });
    await newSnapp.save();
    return successResponse({
      res,
      responseDetails: responseMessage("OK007"),
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: snappService.js:22 ~ exports.createSnappService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.getSnappBasedOnConnectorsService = async (db, id) => {
  try {
    const result = await db.aggregate([
      {
        $match: {
          fan_id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $group: {
          _id: "$fan_id",
          allianceIDs: {
            $push: "$alliance_id",
          },
        },
      },
      {
        $lookup: {
          from: "snapps",
          let: {
            id: "$allianceIDs",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$user_id", "$$id"],
                },
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            ...snappDetails,

            ...snappLikes,
            ...snappBookmarks,
          ],
          as: "snappList",
        },
      },
      {
        $project: {
          snappList: 1,
          _id: 0,
        },
      },
    ]);
    return result.length > 0 ? result[0].snappList : [];
  } catch (err) {
    console.log(
      "🚀 ~ file: snappService.js:38 ~ exports.getSnappBasedOnConnectorsService= ~ err:",
      err
    );
  }
};

exports.getSingleSnappService = async (db, snappId, userId) => {
  try {
    const result = await db.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(snappId),
        },
      },
      ...snappDetails,
      ...snappMetaCount("likes", "likes_count"),
      ...snappMetaCount("comments", "comments_count"),
      ...snappMetaCount("bookmarks", "bookmarks_count"),
      {
        $lookup: {
          from: "comments",
          let: {
            id: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$snapp_id", "$$id"],
                },
              },
            },
            {
              $addFields: {
                customSort: {
                  $cond: {
                    if: { $eq: [userId, "$user_id"] },
                    then: 0,
                    else: 1,
                  },
                },
              },
            },
            {
              $sort: {
                customSort: 1,
                createdAt: -1,
              },
            },
            ...snappDetails,
            ...snappReplyUserData,
            {
              $project: {
                customSort: 0,
              },
            },
          ],
          as: "snapp_comments",
        },
      },
    ]);
    return !!result.length ? result[0] : {};
  } catch (err) {
    console.log(
      "🚀 ~ file: snappService.js:198 ~ exports.getSIngleSnappService= ~ err:",
      err
    );
  }
};

exports.getSnapps = async (db, id) => {
  try {
    const result = await db.aggregate([
      {
        $match: {
          user_id: {
            $ne: id,
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      ...snappDetails,
      ...snappLikes,
      ...snappBookmarks,
    ]);
    return result;
  } catch (err) {
    console.log(
      "🚀 ~ file: snappService.js:113 ~ exports.getSnapps= ~ err:",
      err
    );
  }
};
