const db = require("../../DB");

const getAllRestarauntsOrByName = async (req, res) => {
  if (req.query["restaurantsName"]) {
    const restaurantsName = req.query["restaurantsName"].toLowerCase();

    const results = await db.query(
      "SELECT * FROM restaurants where LOWER(restaurants_name) LIKE   ('%'||$1||'%')",
      [restaurantsName]
    );

    if (!results) {
      return res.status(204).json({
        restaurants: null,
      });
    }

    return res.status(200).json({
      restaurants: results["rows"],
    });
  } 
  else {
    const results = await db.query("select * from restaurants");
    return res.status(200).json({
      restaurants: results["rows"],
    });
  }
};

module.exports = getAllRestarauntsOrByName;
