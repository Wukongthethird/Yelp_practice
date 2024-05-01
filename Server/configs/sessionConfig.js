require("dotenv").config();
const pgstore = require("../DB/pgstore");
const { v4: uuidv4 } = require("uuid");
const SESSIONSECRET = process.env.SESSION_SECRET;

const sessionConfig = {
  id: function (req) {
    return uuidv4(); // replace with jwt
  },
  store: pgstore,
  cookie: {
    /**  this makes cookie save in browser */
    credentials: true,
    httpOnly: true,
    // sameSite: "none",
    // secure: false, //
    maxAge: 1000 * 60 * 60 * 24,
  },
  secret: SESSIONSECRET,
  resave: false,
  saveUninitialized: false,
};

module.exports = sessionConfig;
