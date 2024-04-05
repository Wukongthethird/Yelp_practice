// MAYBE DO THIS OR JUST ONE ROUTE AND IT CAN SAVE ON FRONT END

const db = require("../../DB");

const getRestaurantId = async (req, res, next) => {
  const isLogin = req.session.passport;
  const restaurantId = req.params.id;
  // console.log('server',req.session.passport.user.id)
  await db.query(
    ` SELECT id, restaurants_name, address_location, city, zipcode, about ,
    (EXISTS (SELECT restaurants_id FROM user_favorites WHERE user_id=$1 and restaurants_id=$2)) as favorited
    from restaurants JOIN user_favorites ON id = restaurants_id where id = $2 `,
    [req.session.passport.user.id, req.params.id]
  )

  // Multiple small queries is better for DB usage allows one to customize
  const restaurant = await db
    .query(
      `select id, city, zipcode, about, restaurants_name as "restaurantsName",
    address_location as "addressLocation",
    created_at as "createdAt",
    updated_at as "updatedAt"
    from restaurants where id = $1`,
      [req.params.id]
    )
    .then((res) => res.rows[0]);

  if (!restaurant) {
    return res.json({
      // should put a handle error to go next to a 404 page not found
      restaurant: null,
    });
  }

  const allUsersPrice = await db
    .query(
      `SELECT AVG(CAST(price as FLOAT)) as "averagePrice"  from price_range WHERE restaurants_id =$1`,
      [req.params.id]
    )
    .then((res) => res.rows[0]);

  const allUsersRating = await db
    .query(
      `SELECT AVG(CAST(rating as FLOAT)) as "averageRating"  from ratings WHERE restaurants_id =$1`,
      [req.params.id]
    )
    .then((res) => res.rows[0]);

  if (!isLogin) {
    return res.json({
      restaurant: { ...restaurant },
      generalUsers: {
        ...allUsersPrice,
        ...allUsersRating,
      },
    });
  }

  //User dependent DATA
  const favorited = await db
    .query(
      `SELECT (EXISTS (SELECT restaurants_id FROM user_favorites
      WHERE  user_id =$1  and  restaurants_id =$2)) as favorited`,
      [req.session.passport.user.id, restaurantId]
    )
    .then((res) => res.rows[0]);

  const userPrice = await db
    .query(
      `SELECT price FROM price_range
      WHERE  user_id =$1  and  restaurants_id =$2`,
      [req.session.passport.user.id, restaurantId]
    )
    .then((res) => res.rows[0]);

  const userRating = await db
    .query(
      `SELECT rating FROM ratings
      WHERE  user_id =$1  and  restaurants_id =$2`,
      [req.session.passport.user.id, restaurantId]
    )
    .then((res) => res.rows[0]);




  return res.json({
    restaurant: { ...restaurant },
    generalUsers: {
      ...allUsersPrice,
      ...allUsersRating,
    },
    user: {
      ...favorited,
      ...userPrice,
      ...userRating,
    },
  });
};

module.exports = getRestaurantId;
