require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

/** check on this when posting on servers */
// const isProduction = process.env.Node_env === "production";
// const connectionString = `postgresql://${processs.env.DATABASE_USERNAME}:
//                         ${processs.env.DATABASE_PASSWORD}@${processs.env.DATABASE_HOST}:
//                         ${processs.env.DATABASE_PORT}:${process.env.DATABASE_NAME}`;

// const pool = new Pool({
//     connectionString: isProduction ? proccess.env.DATABASE_URL :connectionString
// })

                        
module.exports = {
  query: (text, params) => pool.query(text, params),
};
