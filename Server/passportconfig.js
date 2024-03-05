var LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./DB");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
var session = require("express-session");
const { authenticate } = require("passport");
var passport = require("passport");

//authenicate user by email
// const authenticate_user = async (user_email, password) => {
//   try {
//     let user = await db.query(
//       "select email,passhash from yelp_users where LOWER(email) = $1",
//       [user_email.toLowerCase()]
//     );

//     user = user.rows[0]
//     if (user) {
//       const auth = await bcrypt.compare(password, user["passhash"]);
//       if (auth) {
//         return user;
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

const authenticate_user = async (user_email, password, done) => {
  await db.query(
    "select email,passhash from yelp_users where LOWER(email) = $1",
    [user_email.toLowerCase()],
    (err, results) => {
      if (err) {
        console.log("first err in db. query", err);
        throw err;
      }
      console.log("res ,auth user", results);
      if (results.rows.length > 0) {
        const user = user.rows[0];
        bcrypt.compare(password, user["passhash"], (err, isMatch) => {
          if (err) {
            console.log("err after hash pass,", err);
            throw err;
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password is not Correct" });
          }
        });
      } else {
        return done(null, false, { message: "email is not registered" });
      }
    }
  );

  // user = user.rows[0]
  // if (user) {
  //   const auth = await bcrypt.compare(password, user["passhash"]);
  //   if (auth) {
  //     return user;
  //   }
  // }
};

/** https://www.youtube.com/watch?v=vxu1RrR0vbw&t=4381s 1 hrs 06 min */
function initializePassport(passport) {
  passport.use(new LocalStrategy())(
    {
      emailField: "email",
      passwordField: "password",
    },
    authenticateUser
  );
   /**
    * initializes a session with passport. this will serialize the info of the userID
    * the info would be store on a req.session.passport.user = {}
    */
  
  passport.serializeuser((user, done) => done(null, user.id));
  /**
   * this will take the session stored on req.user and matches the info on the server/db
   */
  passport.deserializeuser((id, done) => {
    db.query(`Select * FROM users where id = $1`, [id], (err, results) => {
      if (err) {
        console.log("err in deserializer", err);
        throw err;
      }
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initializePassport