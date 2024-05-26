const db = require("../../DB");

const getNewRestaraunts = async (req, res) => {

    const results = await db.query(`select id, restaurants_name as "restaurantsName" , address_location as "addressLocation",
    city, zipcode, created_at as "createdAt", updated_at as "updatedAt", about from restaurants ORDER BY  created_at DESC`);

    
    return res.status(200).json({
      restaurants: results["rows"],
    });

};

module.exports = getNewRestaraunts;
