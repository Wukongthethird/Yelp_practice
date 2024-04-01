// MAYBE DO THIS OR JUST ONE ROUTE AND IT CAN SAVE ON FRONT END

const db = require("../../DB");

const getRestaurantId = async (req, res) => {
  const isLogin = req.session.passport
  console.log("islogin",isLogin)
// console.log('server',req.session.passport.user.id)
// await db.query(
//   ` SELECT id, restaurants_name, address_location, city, zipcode, about , 
//   (EXISTS (SELECT restaurants_id FROM user_favorites WHERE user_id=$1 and restaurants_id=$2)) as favorited 
//   from restaurants JOIN user_favorites ON id = restaurants_id where id = $2 `,
//   [req.session.passport.user.id, req.params.id]
// )
  const result = isLogin
    ? 
    await db.query(
      `SELECT id , restaurants_name,  address_location, city, zipcode,about, (EXISTS (SELECT restaurants_id FROM user_favorites WHERE user_id=$1 and restaurants_id=$2)) as favorited  from restaurants JOIN user_favorites ON id = restaurants_id where id = $2`,
  [req.session.passport.user.id, req.params.id]
    )
    : await db.query("select * from restaurants where id = $1", [
        req.params.id,
      ]);

      console.log("after db,",result)
  if (!result) {
    return res.json({
      // should put a handle error to go next to a 404 page not found
      restaurant: null,
    });
  }
  return res.status(200).json({
    restaurant: result["rows"][0],
  });
};

module.exports = getRestaurantId;
