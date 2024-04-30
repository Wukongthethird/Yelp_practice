const db = require("../../DB");
require("dotenv").config();
const GENSALT = process.env.GENSALT;
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  let data = { ...req.body };
  const passhash = await bcrypt.hash(data["password"].toString(), +GENSALT);
  data["passhash"] = passhash;

  delete data["password"];
  delete data["confirmPassword"];

  const sqlInput = Object.values(data);

  const result = await db.query(
    `INSERT INTO 
      yelp_users (first_name, last_name,   email, passhash) 
      VALUES ($1,$2,$3,$4)
      returning first_name, last_name, email `,
    sqlInput
  );

  return res.status(201).json({ user: result.rows[0] });
};

module.exports = signup;
