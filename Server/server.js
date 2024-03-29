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
const jwt = require('jsonwebtoken')


const isAuth = require("./middlewear/isAuth");

//schemas
const validateSchema = require("./middlewear/validateSchema");
const getRestaurantIdSchema = require("./schema/getRestaurantIdSchema");
const getRestaurantNameSchema = require("./schema/getRestaurantNameSchema");
const createRestaurantSchema = require("./schema/createRestaurantSchema");
const signUpUserSchema = require("./schema/signUpUserSchema");
const loginUserSchema = require("./schema/loginUserSchema");

//Routes
const getAllRestarauntsOrByName = require("./routes/restaurants/getAllRestarauntsOrByName");
const getRestaurantById = require("./routes/restaurants/getRestaurantById");
const createRestaurant = require("./routes/restaurants/createRestaurant");

const db = require("./DB");
/**secrets */
const PORT = process.env.PORT || 3001;
const SESSIONSECRET = process.env.SESSION_SECRET;
const GENSALT = process.env.GENSALT
const JWTSECRET = process.env.JWT_SECRET

/** helper function */
const { camelToSnakeCase } = require("./helper");

/** MIDDLEWARE */
app.set("trust proxy", 1);

app.use(
  cors({
    // allowedHeaders: "X-Requested-With, Content-Type, Accept",
    //   credentials: true,
    //   httpOnly: true,
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
app.use("/ap  i/v1/logout", isAuth);
// app.use("/api/v1/restaurants", isAuth);

// TODO safer methods and middlewears look at react and previus projects
// app.use((req, res, next) => {
//   console.log("pre get",req.body);
//   next();
// });
// get all restaraunts or all restaurants on search data
app.get(
  "/api/v1/restaurants",
  getRestaurantNameSchema,
  validateSchema,
  getAllRestarauntsOrByName
);

// get a restaraunt by id
app.get(
  "/api/v1/restaurant/:id",
  getRestaurantIdSchema,
  validateSchema,
  getRestaurantById
);

//create a reastaruant
// to do validate inputs`` do the camel to sql

app.post(
  "/api/v1/create_restaurant/",
  createRestaurantSchema,
  validateSchema,
  createRestaurant
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

app.get("/api/v1/fetchuser/", async (req, res) => {

  const result = await db.query(`select * from user_sessions where sid = $1`, [
   req.sessionID,
  ]);


  if (result.rows.length === 0) {
    return res.json({ user: {}, status: "logout" });
  }

  const user = result.rows[0].sess.passport.user;
  if (JSON.stringify(req.session.passport.user) === JSON.stringify(user)) {
    return res.json({ user, status: "login", token:req.sessionID });
  }

  return res.json({ user: {}, status: "logout" });
});
/**
 * 
 *  Create new user and add to DB.

    to do validate data If data not valid, return err.
 */

app.post(
  "/api/v1/signup",
  // signUpUserSchema,
  // validateSchema,
  async (req, res) => {
    let data = {};
    for (let key in req.body) {
      data[camelToSnakeCase(key)] = req.body[key];
    }

    const passhash = await bcrypt.hash(data["password"].toString(), GENSALT);
    data["passhash"] = passhash;

    delete data["password"];
    delete data["confirmPassword"];

    const sqlInput = Object.values(data);
    console.log("past schema");

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
 * maynbe use jwt
 */
//https://github.com/jaredhanson/passport/issues/126#issuecomment-32333163
app.post(
  "/api/v1/login",
  loginUserSchema,
  validateSchema,
  passport.authenticate("local", { failWithError: true }),
  (req, res, next) => {
    // sub uuid for token
    console.log(req.sessionID)
    return res.json({ user: req.user, status: "login", token:req.sessionID });
  },
  (err, req, res, next) => {
    const output = JSON.parse(err);

    return res.json(output);
  }
);

app.delete("/api/v1/logout", async (req, res, next) => {
  const sid = req.sessionID;

  await req.session.destroy((err) => {

    if (err) {
      return res.json({ err });
    } else {
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
});

app.get;

//need to add global error messsage
app.listen(PORT, () => {
  console.log(`server is up and listening on port ${PORT}`);
});
