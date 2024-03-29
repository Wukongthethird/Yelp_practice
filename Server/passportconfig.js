var LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const db = require("./DB");

/** https://www.youtube.com/watch?v=vxu1RrR0vbw&t=4381s 1 hrs 06 min */
function initializePassport(passport) {
  const authenticateUser = async (req, email, password, done) => {
    
    if(req.session.passport){
      return done(
        JSON.stringify({
          errors: {
            field: "status",
            message: "you  are already logged in",
          },
        })
      );
    }

    // const results = await db.query(
    //   "select id , email, passhash from yelp_users where LOWER(email) = $1",
    //   [email]
    // );

    const results = await db.query(
      "select id , email, passhash, array_agg(restaurants_id) as restaurants from yelp_users JOIN  user_favorites ON id = user_id where LOWER(email)  = $1 GROUP BY yelp_users.id ",
      [email]
    );

    let user = results.rows[0];

    if (!user) {
      return done(
        JSON.stringify({
          errors: {
            field: "username",
            message: "could not find user by username",
          },
        })
      );
    }

    if (user) {
      const isValid = await bcrypt.compare(password, user["passhash"]);
      if (!isValid) {
        return done(
          JSON.stringify({
            errors: {
              field: "password",
              message: "password is incorrect",
            },
          })
        );
      }
    }
    delete user["passhash"];
    return done(null, user);
  };

  passport.use(
    new LocalStrategy(
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
  passport.serializeUser((user, done) => done(null, user));
  /**
   * this will take the session stored on req.user and matches the info on the server/db
   */
  passport.deserializeUser(async (user,done) => {
    const results = await db.query(`Select email , id  FROM yelp_users where id = $1`, [
      user.id,
    ]);
  
    if (!results) {
      return done(
        JSON.stringify({
          errors: {
            field: "user",
            message: "could not find user by id",
          },
        })
      );
    }

    return done(null,results)

  });
}

module.exports = initializePassport;
