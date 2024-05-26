const db = require("../../DB");

const getAllRestarauntsByPagination = async (req, res) => {

  const limit = req.body["limit"] || 10;
  const cursor = req.body["cursor"];
  const realLimit = Math.min(30, limit);
  const realLimitPlusOne = realLimit + 1;
  
  queries = [realLimitPlusOne]
  if (cursor){
    queries.push(cursor)
  }
  const results = await db.query(
    `select id, restaurants_name as "restaurantsName" ,
     address_location as "addressLocation",
    city, zipcode, created_at as "createdAt", 
    updated_at as "updatedAt", about from restaurants
    ${cursor ? "WHERE id > $2" : ""}
    ORDER BY ID LIMIT $1
    `,queries
  );

  console.log("results" , results)
  return res.status(200).json({
    restaurants: results["rows"].slice(0,realLimit),
    hasMore: results["rows"].length === realLimitPlusOne,
  });
};

module.exports = getAllRestarauntsByPagination;
