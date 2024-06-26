// MAYBE DO THIS OR JUST ONE ROUTE AND IT CAN SAVE ON FRONT END

const db = require("../../DB");

const getRestaurantId = async (req, res, next) => {
  const isLogin = req.session.passport;

  const restaurantId = req.params.id;
  // console.log('server',req.session.passport.user.id)
  // await db.query(
  //   ` SELECT id, restaurants_name, address_location, city, zipcode, about ,
  //   (EXISTS (SELECT restaurants_id FROM user_favorites WHERE user_id=$1 and restaurants_id=$2)) as favorited
  //   from restaurants JOIN user_favorites ON id = restaurants_id where id = $2 `,
  //   [req.session.passport.user.id, req.params.id]
  // )

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
      err: "there is no restaurant",
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
      `SELECT AVG(CAST(rating as FLOAT)) as "averageRating" ,
      COUNT(*) as "totalRating"   
      from ratings WHERE restaurants_id =$1 
      `,
      [req.params.id]
    )
    .then((res) => res.rows[0]);

  const allRatingCountRaw = await db
    .query(
      `SELECT
        rating,
        COUNT(*) 
        FROM
        ratings
        WHERE restaurants_id =$1 
        GROUP BY
        rating`,
      [req.params.id]
    )
    .then((res) => res.rows);


    const allRatingCount = {}


    for( let i=0; i< allRatingCountRaw.length;i++){
      allRatingCount[allRatingCountRaw[i].rating] = allRatingCountRaw[i].count
    }



  const allParentComments = await db
    .query(
      `SELECT comment_id as "commentId", comment_message as "commentMessage",
    comments.created_at as "createdAt", comments.updated_at as "updatedAt",
    user_id as "userId", restaurant_id as "restaurantId",
    parent_id as "parentId" , first_name as "firstName", last_name as "lastName"
    FROM comments JOIN yelp_users ON user_id = id where restaurant_id = $1 and parent_id is NULL
    ORDER BY comments.created_at
    `,
      [restaurantId]
    )
    .then((res) => res.rows);

  if (!isLogin) {
    return res.json({
      restaurant: { ...restaurant },
      generalUsers: {
        ...allUsersPrice,
        ...allUsersRating,
        allRatingCount,
        allParentComments,
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
      allRatingCount,
      allParentComments,
    },
    user: {
      ...favorited,
      ...userRating,
    },
  });
};

module.exports = getRestaurantId;
