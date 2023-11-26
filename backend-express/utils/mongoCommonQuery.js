exports.snappUserRequired = {
  _id: 0,
  first_name: 1,
  last_name: 1,
  user_name: 1,
  user_image: 1,
};

exports.snappDetails = [
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
