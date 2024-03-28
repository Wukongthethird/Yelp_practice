// MAYBE DO THIS OR JUST ONE ROUTE AND IT CAN SAVE ON FRONT END

const db = require("../../DB");
``
const getRestaurantId = async (req, res) => {
  const result = await db.query("select * from restaurants where id = $1", [
    req.params.id,
  ]);

  if (!result) {
    return res.json({
      restaurant: null,
    });
  }
  return res.status(200).json({
    restaurant: result["rows"][0],
  });
}

module.exports= getRestaurantId;