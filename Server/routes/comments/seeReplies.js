const db = require("../../DB");

const seeReplies = async (req, res) => {
  const restaurantId = req.body["restaurantId"];
  const parentId = req.body["parentId"];

  const result = await db
    .query(
      `
    SELECT comment_id as "commentId", comment_message as "commentMessage",
    comments.created_at as "createdAt", comments.updated_at as "updatedAt",
    user_id as "userId", restaurant_id as "restaurantId",
    parent_id as "parentId" ,
    first_name as "firstName", last_name as "lastName"
    FROM comments JOIN yelp_users ON user_id = id where restaurant_id = $1 and parent_id = $2  ORDER BY comments.created_at
    `,
      [restaurantId, parentId]
    )
    .then((res) => res.rows);

  return res.json({ result });
};

module.exports = seeReplies;
