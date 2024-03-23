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
const signUpUserSchema = require("./schema/signUpUserSchema")

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
app.use("/api/v1/logout", isAuth);
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
          res.status(204).json({
            restaurants: null,
          });
        }

        res.status(200).json({
          restaurants: results["rows"],
        });
      } else {
        const results = await db.query("select * from restaurants");
        res.status(200).json({
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
      res.json({
        restaurant: null,
      });
    }
    res.status(200).json({
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

    res.status(201).json({
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
    "about"
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

  res.status(200).json({
    restaurant: result["rows"][0],
  });
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

  res.status(204).json({
    status: "sucess",
  });
});

/**
 * 
 *  Create new user and add to DB.

    to do validate data If data not valid, return err.
 */
app.post("/api/v1/signup",signUpUserSchema,validateSchema, async (req, res) => {
  console.log('signupapi', req.body)
  let data = {};
  for (let key in req.body) {
    data[camelToSnakeCase(key)] = req.body[key];
  }

  const passhash = await bcrypt.hash(data["password"].toString(), 10);
  data["passhash"] = passhash;

  delete data["password"];
  delete data["confirmPassword"];

  const sqlInput = Object.values(data);

  try {
    const result = await db.query(
      `INSERT INTO 
      yelp_users (first_name, last_name, email, passhash) 
      VALUES ($1,$2,$3,$4)
      returning first_name, last_name, email `,
      sqlInput
    );
    console.log("result", result);
    res.status(201).json({user:result.rows[0]});
  } catch (err) {
    console.log(err);
  }
});

/**
 * logins user by email needs to validate later and do session
 */
//https://github.com/jaredhanson/passport/issues/126#issuecomment-32333163
app.post(
  "/api/v1/login",
  passport.authenticate("local", { failWithError: true }),
  (req, res, next) => {
    console.log("login", req.user);
    res.status(200).json({ user: req.user, status: "login" });
  },
  (err, req, res, next) => {
    res.send(err);
  }
);

app.delete("/api/v1/logout", async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log("err", err);
    }
  });
  // these 2 lines remove/replace cookie on browser probably removing the thing that is sent
  req.sessionID = null;
  res.clearCookie("connect.sid", {
    // path: "/",
    httpOnly: true,
    credentials: true,
  });

  res.json({ msg: "you have logout successfully" });
});

//need to add global error messsage
app.listen(PORT, () => {
  console.log(`server is up and listening on port ${PORT}`);
});
