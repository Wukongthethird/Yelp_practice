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
    `SELECT id, restaurants_name AS "restaurantsName" ,
     address_location AS "addressLocation",
    city, zipcode, created_at AS "createdAt", 
    updated_at AS "updatedAt", about ,
    avg(rating) as "averageRating" , count(restaurants_id) as "userVotes" 
    FROM restaurants FULL JOIN ratings on id = restaurants_id
  
    ${cursor ? "WHERE id > $2" : ""}
      GROUP BY id
    ORDER BY ID LIMIT $1
    `,queries
  );



  
  // const ratingMetaData = await db.query(
  //   `select avg(rating) as average , count(*) as userVotes , restaurants_id  from ratings WHERE
  //    restaurants_id  = any($1) GROUP BY restaurants_id `,
  //   [id] 
  // )

  // const groupedResults = 
 
  console.log(results["rows"])
  
  
  return res.status(200).json({
    restaurants: results["rows"].slice(0,realLimit),
    hasMore: results["rows"].length === realLimitPlusOne,
  });
};

module.exports = getAllRestarauntsByPagination;
