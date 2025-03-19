db.posts.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user",  // Assuming "user" field directly contains ObjectId
      foreignField: "_id", // The field in "usersDB" to match with
      as: "userInfo"
    }
  },
  {
    $project: {
      _id: 1,
      title: 1,
      user:1
      }
  }
]);
