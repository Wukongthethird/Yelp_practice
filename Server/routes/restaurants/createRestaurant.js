const db = require("../../DB");

const createRestaurant = async (req, res) => {
  const sqlInput = Object.values(req.body);

  const result = await db.query(
    `INSERT INTO 
    restaurants (restaurants_name, address_location, city, zipcode, about) 
    VALUES ($1,$2,$3,$4,$5)
    returning * `,
    sqlInput
  );

  return res.status(201).json({
    restaurant: result["rows"][0],
  });
};

module.exports = createRestaurant;
