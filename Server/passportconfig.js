var LocalStrategy = require('passport-local').Strategy;
const {pool} = require('./DB')
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
var session = require("express-session");
const { authenticate } = require('passport');


//authenicate user by email
const authenticate_user = async (user_email, password) => {
  try {
    let user = await db.query(
      "select email,passhash from yelp_users where LOWER(email) = $1",
      [user_email.toLowerCase()]
    );
    
    user = user.rows[0]
    if (user) {
      const auth = await bcrypt.compare(password, user["passhash"]);
      if (auth) {
        return user;
      }
    }
  } catch (err) {
    console.log(err);
  }
};


/** https://www.youtube.com/watch?v=vxu1RrR0vbw&t=4381s 1 hrs 06 min */
function initialize(passport){


  passport.use(new LocalStrategy)({
    emailField:"email",
    passwordField:"password"

  },authenticateUser)
}