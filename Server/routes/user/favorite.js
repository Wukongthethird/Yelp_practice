const db = require("../../DB");

const favorite =  async(req,res)=>{
  const userId = req.session.passport.user.id;
  const restaurantId = req.body["restaurantId"];

  const result = await db
    .query(
      `SELECT * FROM user_favorites where user_id = $1 and restaurants_id =$2`,
      [userId, restaurantId]
    )
    .then((res) => res.rows[0]);

  if (!result) {
    const result = await db.query(
      `INSERT INTO user_favorites (user_id, restaurants_id) VALUES($1,$2) returning *`,
      [userId, restaurantId]
    );
    return res.json({ msg: "Favorited" });
  } else {
    const result = await db.query(
      `DELETE FROM user_favorites  where user_id = $1 AND restaurants_id =$2  returning *`,
      [userId, restaurantId]
    );
    return res.json({ msg: "Unfavorited" });
  }
  
}


module.exports = favorite