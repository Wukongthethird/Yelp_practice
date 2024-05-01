const db = require("../../DB");

const seeReplies = async (req, res) => {
  const restaurantId = req.body["restaurantId"];
  const parentId = req.body["parentId"];

  const result = await db
    .query(
      `
    SELECT comment_id as "commentId", comment_message as "commentMessage",
    created_at as "createdAt", updated_at as "updatedAt",
    user_id as "userId", restaurant_id as "restaurantId",
    parent_id as "parentId" 
    FROM comments where restaurant_id = $1 and parent_id = $2
    `,
      [restaurantId, parentId]
    )
    .then((res) => res.rows);

  return res.json({ result });
};

module.exports = seeReplies;
