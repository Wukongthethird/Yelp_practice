require("dotenv").config();
const db = require("../DB");
var session = require("express-session");

conObject = {
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
}

const pgstore = new (require('connect-pg-simple')(session))({
  pool:db,
  conObject,
  tableName : 'user_sessions' ,
  createTableIfMissing: true, // creates session table
})

module.exports = pgstore;
