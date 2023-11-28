const { default: mongoose } = require("mongoose");
const likedModel = require("../models/likedModel");
const commentModal = require("../models/commentModal");
const bookmarkModel = require("../models/bookmarkModel");

exports.getDbBasedOnType = (type) => {
  switch (type) {
    case 1:
      return likedModel;
    case 2:
      return commentModal;
    case 3:
      return bookmarkModel;
  }
};

exports.snappUserRequired = {
  _id: 0,
  first_name: 1,
  last_name: 1,
  user_name: 1,
  user_image: 1,
};

exports.snappLatestComment = [
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
          $sort: {
            createdAt: -1,
          },
        },
        {
          $limit: 1,
        },
        {
          $project: {
            comment: 1,
            createdAt: 1,
          },
        },
      ],
      as: "commentData",
    },
  },
  {
    $unwind: {
      path: "$commentData",
      preserveNullAndEmptyArrays: true,
    },
  },
];

exports.snappUserDetails = [
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
            _id: 0,
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
];

exports.snappLikes = [
  {
    $lookup: {
      from: "likes",
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
          $project: {
            _id: 0,
            snapp_id: 1,
            createdAt: 1,
          },
        },
      ],
      as: "likes",
    },
  },
  {
    $unwind: {
      path: "$likes",
      preserveNullAndEmptyArrays: true,
    },
  },
];

exports.snappBookmarks = [
  {
    $lookup: {
      from: "bookmarks",
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
          $project: {
            _id: 0,
            snapp_id: 1,
            createdAt: 1,
          },
        },
      ],
      as: "bookmarks",
    },
  },
  {
    $unwind: {
      path: "$bookmarks",
      preserveNullAndEmptyArrays: true,
    },
  },
];

exports.snappReplyUserData = [
  {
    $unwind: {
      path: "$replies",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "users",
      let: {
        id: "$replies.reply_user_id",
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
            _id: 1,
            first_name: 1,
            last_name: 1,
            user_name: 1,
            user_image: 1,
          },
        },
      ],
      as: "replyuserData",
    },
  },
  {
    $unwind: {
      path: "$replyuserData",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: "$_id",
      comment: {
        $first: "$comment",
      },
      createdAt: {
        $first: "$createdAt",
      },
      userData: {
        $first: "$userData",
      },
      user_id: {
        $first: "$user_id",
      },
      snapp_id: {
        $first: "$snapp_id",
      },
      reply_comments: {
        $push: "$replies",
      },
      reply_userData: {
        $push: "$replyuserData",
      },
    },
  },
];

exports.snappMetaCount = (collectionName, stagename) => {
  return [
    {
      $lookup: {
        from: collectionName,
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
            $count: "count",
          },
        ],
        as: stagename,
      },
    },
    {
      $unwind: {
        path: `$${stagename}`,
        preserveNullAndEmptyArrays: true,
      },
    },
  ];
};

exports.connectorListProject = [
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

exports.connectorMatchFunction = (type, id) => {
  if (type === 3) {
    return { alliance_id: new mongoose.Types.ObjectId(id) };
  } else {
    return { fan_id: new mongoose.Types.ObjectId(id) };
  }
};
