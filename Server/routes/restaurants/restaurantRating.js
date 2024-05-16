const db = require("../../DB");

const restaurantRating = async (req, res) => {
  const userId = req.session.passport.user.id;
  const restaurantId = req.body["restaurantId"];
  const voteValue = +req.body["voteValue"];

  if ( voteValue<0 || voteValue>5) { 
    return;
  }

  // IM Going to lock out the user after they voted so this check does not need to do
  const hasRated = await db
    .query(`SELECT * FROM ratings where user_id = $1 and restaurants_id =$2`, [
      userId,
      restaurantId,
    ])
    .then((res) => res.rows[0]);

  if (hasRated) {
    return res.json({ err: "you've already rated this restaurant" });
  }

  const result = await db.query(
    `INSERT INTO ratings (user_id, restaurants_id ,rating) VALUES($1,$2, $3) returning *`,
    [userId, restaurantId, voteValue]
  );

  return res.json({});
};

module.exports = restaurantRating;
