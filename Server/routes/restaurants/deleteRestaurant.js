const db = require("../../DB");

const deleteRestaurant = async (req,res) =>{
  await db.query(
    `
  DELETE FROM restaurants
  WHERE id = $1
   `,
    [req.params.id]
  );

  return res.status(204).json({
    status: "sucess",
  });
}

module.exports = deleteRestaurant;