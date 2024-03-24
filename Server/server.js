"use strict";
require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
var cors = require("cors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
var session = require("express-session");
const pgstore = require("./DB/pgstore");
const isAuth = require("./middlewear/isAuth");

//schemas
const expressValidator = require("express-validator");
const validateSchema = require("./middlewear/validateSchema");
const getRestaurantIdSchema = require("./schema/getRestaurantIdSchema");
const getRestaurantNameSchema = require("./schema/getRestaurantNameSchema");
const createRestaurantSchema = require("./schema/createRestaurantSchema");
const signUpUserSchema = require("./schema/signUpUserSchema");
const loginUserSchema = require("./schema/loginUserSchema");

const db = require("./DB");
/**secrets */
const PORT = process.env.PORT || 3001;
const SESSIONSECRET = process.env.SESSION_SECRET;

/** helper function */
const { camelToSnakeCase } = require("./helper");

/** MIDDLEWARE */
app.set("trust proxy", 1);

app.use(
  cors({
    // origin:"http://localhost:5173",
    // allowedHeaders: "X-Requested-With, Content-Type, Accept",
    //   credentials: true,
    //   httpOnly: false,
    // sameSite: "lax",
    // secure:false,
    //
    // origin: "*",
    /**  this makes cookie save in browser */
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());

// express session store
app.use(
  session({
    id: function (req) {
      return uuidv4(); // use UUIDs for session IDs
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
  })
);

/** passport */
// passport sessions stuff
const passport = require("passport");
const initializePassport = require("./passportconfig");
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

//admin auth TODO
// app.use("/api/v1/create_restaurant/", isAuth);

// userAuth
// app.use("/api/v1/logout", isAuth);
// app.use("/api/v1/restaurants", isAuth);

// TODO safer methods and middlewears look at react and previus projects
// app.use((req, res, next) => {
//   console.log("pre get",req.body);
//   next();
// });
getRestaurantNameSchema,
  validateSchema,
  // get all restaraunts or all restaurants on search data
  app.get(
    "/api/v1/restaurants",
    getRestaurantNameSchema,
    validateSchema,
    async (req, res) => {
      if (req.query["restaurantsName"]) {
        const restaurantsName = req.query["restaurantsName"].toLowerCase();

        const results = await db.query(
          "SELECT * FROM restaurants where LOWER(restaurants_name) LIKE   ('%'||$1||'%')",
          [restaurantsName]
        );

        if (!results) {
          return res.status(204).json({
            restaurants: null,
          });
        }

        return res.status(200).json({
          restaurants: results["rows"],
        });
      } else {
        const results = await db.query("select * from restaurants");
        return res.status(200).json({
          restaurants: results["rows"],
        });
      }
    }
  );

// get a restaraunt by id
app.get(
  "/api/v1/restaurant/:id",
  getRestaurantIdSchema,
  validateSchema,
  async (req, res) => {
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
);

//create a reastaruant
// to do validate inputs`` do the camel to sql

app.post(
  "/api/v1/create_restaurant/",
  createRestaurantSchema,
  validateSchema,
  async (req, res) => {
    const sqlInput = Object.values(req.body);

    const result = await db.query(
      `INSERT INTO 
      restaurants (restaurants_name, address_location, city, zipcode, about) 
      VALUES ($1,$2,$3,$4,$5)
      returning * `,
      sqlInput
    );

    return res.status(201).json({
      restaurant: result["rows"][0],
    });
  }
);

//update restaraunt

app.patch("/api/v1/restaurant/:id", async (req, res) => {
  let allowedColumns = [
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
  return;
});

//delete restaurants based on id
app.delete("/api/v1/restaurant/:id", async (req, res) => {
  await db.query(
    `
  DELETE FROM restaurants
  WHERE id = $1
   `,
    [req.params.id]
  );

  return res.status(204).json({
    status: "sucess",
  });
});

/**
 * 
 *  Create new user and add to DB.

    to do validate data If data not valid, return err.
 */
app.post(
  "/api/v1/signup",
  signUpUserSchema,
  validateSchema,
  async (req, res) => {
    let data = {};
    for (let key in req.body) {
      data[camelToSnakeCase(key)] = req.body[key];
    }

    const passhash = await bcrypt.hash(data["password"].toString(), 10);
    data["passhash"] = passhash;

    delete data["password"];
    delete data["confirmPassword"];

    const sqlInput = Object.values(data);

    const result = await db.query(
      `INSERT INTO 
      yelp_users (first_name, last_name, email, passhash) 
      VALUES ($1,$2,$3,$4)
      returning first_name, last_name, email `,
      sqlInput
    );

    return res.status(201).json({ user: result.rows[0] });
  }
);

/**
 * logins user by email needs to validate later and do session
 */
//https://github.com/jaredhanson/passport/issues/126#issuecomment-32333163
app.post(
  "/api/v1/login",
  loginUserSchema,
  validateSchema,
  passport.authenticate("local", { failWithError: true }),
  (req, res, next) => {
    return res.status(200).json({ user: req.user, status: "login" });
  },
  (err, req, res, next) => {
    return res.send(err);
  }
);

app.delete("/api/v1/logout", async (req, res, next) => {
  const sid = req.sessionID;

  await req.session.destroy((err) => {
    console.log("destroy in here", err);
    if (err) {
      console.log(err, "Err");
      return res.json({ err });
    } else {
      console.log("in here");
      req.sessionID = null;
      req.logout((err) => {
        if (err) {
          console.log("err", err);
        }
      });
      return res
        .clearCookie("connect.sid", {
          path: "/",
          httpOnly: true,
          credentials: true,
        })
        .json({ msg: "you have logout successfully" });
    }
  });
  //this works
  // await  db.query('DELETE FROM user_sessions  "sid" in ($1)',[sid])

  //this does not
  // const nea = await db.query(`DELETE FROM user_sessions where "sid" = "${sid}"`)

  // req.session.destroy(sid)

  // pgstore.destroy(req.sessionID , (err)=>{
  //   if (err)=>{
  //     console.log('deletre',err)
  //   }

  // })

  // // these 2 lines remove/replace cookie on browser probably removing the thing that is sent
  // req.sessionID = null;
  // res.clearCookie("connect.sid", {
  //   path: "/",
  //   httpOnly: true,
  //   credentials: true,
  // });

  // req.logout((err) => {
  //   if (err) {
  //     console.log("err", err);
  //   }
  // });

  // return res.json({ msg: "you have logout successfully" });
});

//need to add global error messsage
app.listen(PORT, () => {
  console.log(`server is up and listening on port ${PORT}`);
});
