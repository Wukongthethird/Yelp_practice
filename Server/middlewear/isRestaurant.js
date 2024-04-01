// handles if restaurant exists 

const isRestaurant = async (req, res, next) => {

  const restaurantId = req.body["restaurantId"];

  const isRestaurant = await db.query(`select * from restaurants where id=$1`, [
    restaurantId,
  ]);

  if (isRestaurant.rows.length === 0 ) {
    return res.json({ msg: "That restaurant does not exist" });
  } 

  return next();
}

module.exports = isRestaurant;