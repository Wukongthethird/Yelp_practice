const { body, trim, isAlphanumeric } = require("express-validator");
const db = require("../DB");
const createRestaurantSchema = [
  body("restaurantsName")
    .exists()
    .trim()
    .isAlphanumeric()
    .isLength({ min: 1 })
    .escape()
    .bail(),
  body("addressLocation").exists().trim().isLength({ min: 1 }).escape().bail(),
  body("city").exists().trim().isLength({ min: 1 }).escape().bail(),
  body("zipcode").isPostalCode("US").trim().escape().bail(),
  body("about").trim().optional().escape().bail(),
  body().custom(async (value, { req }) => {
    // selects if restarant in db
    const existRestaurant = await db.query(
      "SELECT * FROM restaurants where LOWER(restaurants_name) = $1",
      [value.restaurantsName.toLowerCase()]
    );

    // this loop checks for if address matches with a restaurant
    const restaurants = existRestaurant.rows;
    for (let r of restaurants) {
      if (
        r.address_location.toLowerCase() ==
          value.addressLocation.toLowerCase() &&
        r.city.toLowerCase() == value.city.toLowerCase() &&
        r.zipcode == value.zipcode
      ) {
        throw new Error("Restaurant exist");
      }
    }
  }),
];

module.exports = createRestaurantSchema;
