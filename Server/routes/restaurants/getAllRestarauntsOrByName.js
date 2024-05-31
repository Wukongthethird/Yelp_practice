const db = require("../../DB");

const getAllRestarauntsOrByName = async (req, res,next) => {
  
    const restaurantsName = req.query["restaurantsName"].toLowerCase();
    try{
    const results = await db.query(
      `SELECT id, restaurants_name as "restaurantsName" , address_location as "addressLocation" ,
      city, zipcode, created_at as "createdAt", updated_at as "updatedAt", about,
      avg(rating) as "averageRating" , count(restaurants_id) as "userVotes" 
      FROM restaurants FULL JOIN ratings on id = restaurants_id where LOWER(restaurants_name) LIKE   ('%'||$1||'%')
      GROUP BY id`,
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
  }catch(err){
    next(err)
  }
  

};

module.exports = getAllRestarauntsOrByName;
