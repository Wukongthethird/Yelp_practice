const db = require("../../DB");

const commentOrReply = async (req, res) => {
  const userId = req.session.passport.user.id;
  const commentMessage = req.body["commentMessage"];
  const restaurantId = req.body["restaurantId"];
  const parentId = req.body["parentId"];

  if (parentId) {
    const parentComment = await db
      .query(
        `
      select comment_id as "commentId", comment_message as "commentMessage",
      created_at as "createdAt", updated_at as "updatedAt",
      user_id as "userId", restaurant_id as "restaurantId",
      parent_id as "parentId"  from comments where comment_id = $1
    `,
        [parentId]
      )
      .then((parent) => parent.rows[0]);

    if (!parentComment) {
      return res.json({ msg: "who are you even talking to?" });
    }

    if (+parentComment.restaurantId !== +restaurantId) {
      return res.json({ msg: " you've some how strayed" });
    }
  }

  const result = await db
    .query(
      `
  INSERT INTO comments( comment_message, user_id, restaurant_id, parent_id)
  values($1, $2,$3,$4) returning *
  `,
      [commentMessage, userId, restaurantId, parentId]
    )
    .then((res) => res.rows[0]);

  return res.json({ msg: "commented" });
};

module.exports = commentOrReply;
