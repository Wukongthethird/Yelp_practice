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
const jwt = require("jsonwebtoken");

const isAuth = require("./middlewear/isAuth");
const isRestaurant = require("./middlewear/isRestaurant");

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
const updateRestaurant = require("./routes/restaurants/updateRestaurant");
const deleteRestaurant = require("./routes/restaurants/deleteRestaurant");
const fetchUser = require("./routes/user/fetchuser");
const signup = require("./routes/loginsignup/signup");
const logout = require("./routes/loginsignup/logout");
const favorite = require("./routes/user/favorite")
const db = require("./DB");
/**secrets */
const PORT = process.env.PORT || 3001;
const SESSIONSECRET = process.env.SESSION_SECRET;
const GENSALT = process.env.GENSALT;
const JWTSECRET = process.env.JWT_SECRET;

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
const { restart } = require("nodemon");

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
app.post(
  "/api/v1/create_restaurant/",
  createRestaurantSchema,
  validateSchema,
  createRestaurant
);

//update restaraunt

app.patch("/api/v1/restaurant/:id", isAuth, isRestaurant, updateRestaurant);

//delete restaurants based on id
app.delete("/api/v1/restaurant/:id", isRestaurant, deleteRestaurant);

app.get("/api/v1/fetchuser/", fetchUser);
/**
 * 
 *  Create new user and add to DB.

    to do validate data If data not valid, return err.
 */

app.post(
  "/api/v1/signup",
  // signUpUserSchema,
  // validateSchema,
  signup
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
    console.log("inside login")
    return res.json({ user: req.user, status: "login", token: req.sessionID });
  },
  (err, req, res, next) => {
    const output = JSON.parse(err);
    return res.json(output);
  }
);

app.delete("/api/v1/logout", logout);

/********** FAVORITES */
// SHould i check if userId matches with user on state what about impersonating another user should function in general
// need to do validation
// check if liked if sends again its unlike maybe its own endpoint
app.post("/api/v1/favorite", isAuth, isRestaurant, favorite);

// so turns out this is a survey on yelp no one votes on this repurpose this as a submission
// repurpose to rating
app.post(
  "/api/v1/pricevoting",
  isAuth,
  isRestaurant,
  async (req, res, next) => {
    const userId = req.session.passport.user.id;
    const restaurantId = req.body["restaurantId"];
    const voteValue = req.body["voteValue"];

    // IM Going to lock out the user after they voted so this check does not need to do
    // const result = await db.query(
    //   `SELECT * FROM user_favorites where user_id = $1 and restaurants_id =$2`,
    //   [userId, restaurantId]
    // ).then( res=> res.rows[0]);

    const result = await db.query(
      `INSERT INTO price_range (user_id, restaurants_id ,price) VALUES($1,$2, $3) returning *`,
      [userId, restaurantId, voteValue]
    );

    console.log("res", result.rows[0]);
    return res.json({ msg: "voted" });
  }
);

app.post(
  "/api/v1/restaurantrating",
  isAuth,
  isRestaurant,
  async (req, res, next) => {
    const userId = req.session.passport.user.id;
    const restaurantId = req.body["restaurantId"];
    const voteValue = req.body["voteValue"];

    // IM Going to lock out the user after they voted so this check does not need to do
    const hasRated = await db
      .query(
        `SELECT * FROM ratings where user_id = $1 and restaurants_id =$2`,
        [userId, restaurantId]
      )
      .then((res) => res.rows[0]);

    if (hasRated) {
      return res.json({ err: "you've already rated this restaurant" });
    }

    const result = await db.query(
      `INSERT INTO ratings (user_id, restaurants_id ,rating) VALUES($1,$2, $3) returning *`,
      [userId, restaurantId, voteValue]
    );

    console.log("res", result.rows[0]);
    return res.json({});
  }
);

app.post(
  "/api/v1/commentorreply",
  isAuth,
  isRestaurant,
  async (req, res, next) => {
    const userId = req.session.passport.user.id;
    const commentMessage = req.body["commentMessage"];
    const restaurantId = req.body["restaurantId"];
    const parentId = req.body["parentId"];
    console.log("req", req.body, parentId);
    if (parentId) {
      const parentComment = await db
        .query(
          `
        select comment_id as "commentId", comment_message as "commentMessage",
        created_at as "createdAt", updated_at as "updatedAt",
        user_id as "userId", restaurant_id as "restaurantId",
        parent_id as "parentId"  from comments where comment_id = $1
      `,
          [parentId]
        )
        .then((parent) => parent.rows[0]);

      console.log("parent", parentComment);
      if (!parentComment) {
        return res.json({ msg: "who are you even talking to?" });
      }

      if (+parentComment.restaurantId !== +restaurantId) {
        return res.json({ msg: " you've some how strayed" });
      }
    }

    const result = await db
      .query(
        `
    INSERT INTO comments( comment_message, user_id, restaurant_id, parent_id)
    values($1, $2,$3,$4) returning *
    `,
        [commentMessage, userId, restaurantId, parentId]
      )
      .then((res) => res.rows[0]);

    return res.json({ msg: "commented" });
  }
);

app.post("/api/v1/seereplies", isRestaurant, async (req, res, next) => {
  const restaurantId = req.body["restaurantId"];
  const parentId = req.body["parentId"];

  const result = await db
    .query(
      `
    SELECT comment_id as "commentId", comment_message as "commentMessage",
    created_at as "createdAt", updated_at as "updatedAt",
    user_id as "userId", restaurant_id as "restaurantId",
    parent_id as "parentId" 
    FROM comments where restaurant_id = $1 and parent_id = $2
    `,
      [restaurantId, parentId]
    )
    .then((res) => res.rows);

  return res.json({ result });
});

//need to add global error messsage
app.listen(PORT, () => {
  console.log(`server is up and listening on port ${PORT}`);
});
