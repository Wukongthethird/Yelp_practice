var LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./DB");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
var session = require("express-session");
var passport = require("passport");
const { authenticate } = require("passport");

const db = require("./DB");

/** https://www.youtube.com/watch?v=vxu1RrR0vbw&t=4381s 1 hrs 06 min */
function initializePassport(passport) {
  //holy fuck you need to pass req through
  const authenticateUser = async (req, email, password) => {

    const results = await db.query(
      "select id, email, passhash from yelp_users where LOWER(email) = $1",
      [email]
    );

    if (!results.rows) {
      return {
        errors: [
          {
            field: "username",
            message: "could not find user by username",
          },
        ],
      };
    }

    if (results.rows.length > 0) {
      const user = results.rows[0];
      const isValid = await bcrypt.compare(password, user["passhash"]);
      if (!isValid) {
        return {
          errors: [
            {
              field: "password",
              message: "password is incorrect",
            },
          ],
        };
      }
      req.session.userId = user.id;
      return { user };
    }
 
  };

  passport.use(
    new LocalStrategy(
      // HAS TO BE ISERNAME FIELD SO DUMB
      {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );
  /**
   * initializes a session with passport. this will serialize the info of the userID
   * the info would be store on a req.session.passport.user = {}
   */
  passport.serializeUser((user, done) => done(null, user.id));
  /**
   * this will take the session stored on req.user and matches the info on the server/db
   */
  passport.deserializeUser((id, done) => {
    db.query(`Select * FROM users where id = $1`, [id], (err, results) => {
      if (err) {
        console.log("err in deserializer", err);
        throw err;
      }
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initializePassport;
