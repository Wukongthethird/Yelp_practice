const db = require("../../DB");

const updateRestaurant = async (req, res) => {
  const allowedColumns = [
    "restaurants_name",
    "address_location",
    "city",
    "zipcode",
    "about",
  ];
  let columns = [];
  let values = [];
  let count = 2;
  for (let c of allowedColumns) {
    if (req.body[c]) {
      columns.push(`${c} = $${count}`);
      values.push(req.body[c]);
      count++;
    }
  }

  const result = await db.query(
    `UPDATE restaurants SET ${columns.join(", ")} 
   WHERE id = $1 returning *`,
    [req.params.id, ...values]
  );
  if (!result) {
    return null;
  }

  return res.status(200).json({
    restaurant: result["rows"][0],
  });
};

module.exports = updateRestaurant;
