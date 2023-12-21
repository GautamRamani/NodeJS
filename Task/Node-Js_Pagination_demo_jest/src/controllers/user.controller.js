const User = require('../schema/user.schema');

module.exports.getUsersWithPostCount = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    const aggregationPipeline = [
      {
        $lookup: {
          from: 'posts', // The name of the posts collection
          localField: '_id',
          foreignField: 'userId',
          as: 'posts',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          posts: { $size: '$posts' }, // Count the number of posts for each user
        },
      },
      {
        $facet: {
          users: [{ $skip: (page - 1) * limit }, { $limit: limit }], // Pagination, adjust skip and limit as needed
          pagination: [
            {
              $count: 'totalDocs',
            },
            {
              $addFields: {
                page: page,
                limit: limit,
                totalPages: {
                  $ceil: { $divide: ['$totalDocs', limit] },
                },
                pagingCounter: (page - 1) * limit + 1,
                hasPrevPage: page > 1,
                hasNextPage: {
                  $lt: [
                    page,
                    {
                      $ceil: {
                        $divide: ["$totalDocs", limit]
                      }
                    }
                  ]

                },
                prevPage: page > 1 ? page - 1 : null,
              },
            },
            {
              $addFields: {
                nextPage: {
                  $cond: {
                    if: {
                      $eq: ["$hasNextPage", false]
                    },
                    then: null, // If hasNextPage is null, set nextPage to null
                    else: page + 1 // If hasNextPage is not null, set nextPage to the count field (or the desired numeric value)
                  }
                }
              }
            },
            {
              $project: {
                _id: 0, // Exclude _id field from pagination object
              },
            },
          ],
        },
      },
      {
        $unwind: '$pagination', // Unwind the pagination array to get a single object
      },
    ];

    let userPostDetails = await User.aggregate(aggregationPipeline);

    res.status(200).json({ data: userPostDetails[0] || {} });
  } catch (error) {
    res.send({ error: error.message });
  }
};