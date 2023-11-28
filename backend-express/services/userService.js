const { default: mongoose } = require("mongoose");

exports.getUserService = async (db, id) => {
  try {
    const result = await db.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "connectors",
          let: {
            id: "$_id",
          },
          pipeline: [
            {
              $facet: {
                alliance_count: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$fan_id", "$$id"],
                      },
                    },
                  },
                  {
                    $count: "count",
                  },
                ],
                fans_count: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$alliance_id", "$$id"],
                      },
                    },
                  },
                  {
                    $count: "count",
                  },
                ],
                snapp_count: [
                  {
                    $lookup: {
                      from: "snapps",
                      let: {
                        id: id,
                      },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $eq: ["$user_id", "$$id"],
                            },
                          },
                        },
                        {
                          $count: "count",
                        },
                      ],
                      as: "snapps",
                    },
                  },
                  {
                    $unwind: {
                      path: "$snapps",
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                  {
                    $project: {
                      snapps: 1,
                    },
                  },
                ],
              },
            },
            {
              $project: {
                total_fans: {
                  $ifNull: [{ $arrayElemAt: ["$fans_count.count", 0] }, 0],
                },
                total_alliance: {
                  $ifNull: [{ $arrayElemAt: ["$alliance_count.count", 0] }, 0],
                },
                snapp_count: {
                  $ifNull: [
                    { $arrayElemAt: ["$snapp_count.snapps.count", 0] },
                    0,
                  ],
                },
              },
            },
          ],
          as: "counts",
        },
      },
      {
        $unwind: {
          path: "$counts",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return result[0];
  } catch (err) {
    console.log(
      "🚀 ~ file: userService.js:5 ~ exports.getUserService= ~ err:",
      err
    );
  }
};
