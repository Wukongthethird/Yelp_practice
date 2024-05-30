const db = require("../../DB");

const getAllRestarauntsOrByName = async (req, res) => {
  
    const restaurantsName = req.query["restaurantsName"].toLowerCase();

    const results = await db.query(
      `SELECT id, restaurants_name as "restaurantsName" , address_location as "addressLocation" ,
      city, zipcode, created_at as "createdAt", updated_at as "updatedAt", about
      FROM restaurants where LOWER(restaurants_name) LIKE   ('%'||$1||'%')`,
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
  

};

module.exports = getAllRestarauntsOrByName;
