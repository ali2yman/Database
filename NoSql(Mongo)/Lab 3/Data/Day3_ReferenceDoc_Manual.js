
db.posts.aggregate([
  {
    $lookup: {
      from: "users", // The collection to join with
      localField: "user", // The field from the posts collection
      foreignField: "_id", // The field from the users collection
      as: "userInfo" // The alias for the joined data
    }
  },
  {
    $unwind: "$userInfo" // Unwind the array created by the $lookup stage
  },
  {
    $project: {
      title: 1,
      userName: "$userInfo.name" ,
      userEmail: "$userInfo.email",
      userId:"$userInfo._id"
    }
  }
])

