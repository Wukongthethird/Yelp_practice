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
    .query("select * from restaurants where id = $1", [req.params.id])
    .then((res) => res.rows[0]);

  if (!restaurant) {
    return res.json({
      // should put a handle error to go next to a 404 page not found
      restaurant: null,
    });
  }

  const allUsersPrice = await db
    .query(
      `SELECT AVG(CAST(price as FLOAT)) as "averageVotes"  from price_range WHERE restaurants_id =$1`,
      [req.params.id]
    )
    .then(( res => res.rows[0]));

    console.log("allUser" ,  allUsersPrice)
  if (!isLogin) {
    return res.json({
      restuarant:{...restaurant},
      generalUsers:{...allUsersPrice},
    })
  }

  //User dependent DATA
  const favorited = await db
    .query(
      `SELECT (EXISTS (SELECT restaurants_id FROM user_favorites
      WHERE  user_id =$1  and  restaurants_id =$2)) as favorited`,
      [req.session.passport.user.id, restaurantId]
    )
    .then((res) => res.rows[0]);

  const userPriceRange = await db
    .query(
      `SELECT * FROM price_range
      WHERE  user_id =$1  and  restaurants_id =$2`,
      [req.session.passport.user.id, restaurantId]
    )
    .then((res) => res.rows[0]);

  // console.log("user req.session.passport.user.id", req.session.passport.user.id, req.params.id)
  // const result = isLogin
  //   ?
  //   await db.query(
  //     `
  //     SELECT id , restaurants_name,  address_location, city, zipcode,about,
  //     (EXISTS (SELECT restaurants_id FROM user_favorites JOIN restaurants ON  restaurants_id = id WHERE user_id=$1 and restaurants_id=$2)) as favorited
  //     from restaurants where id = $2
  //     `,
  // [ req.session.passport.user.id, req.params.id]
  //   )
  //   : await db.query("select * from restaurants where id = $1", [
  //       req.params.id,
  //     ]);

  return res.json({
    restuarant:{...restaurant},
    generalUsers:{...allUsersPrice},
    user:{
      ...favorited,
      ...userPriceRange
    }
  })
};

module.exports = getRestaurantId;
