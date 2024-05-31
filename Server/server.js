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
const db = require("./DB");

const corsConfig = require("./configs/corsConfig");
const sessionConfig = require("./configs/sessionConfig");

//middlewear
const isAuth = require("./middlewear/isAuth");
const isRestaurant = require("./middlewear/isRestaurant");
const errorHandler = require("./middlewear/errorHandler")

//schemas
const validateSchema = require("./middlewear/validateSchema");
const getRestaurantIdSchema = require("./schema/getRestaurantIdSchema");
const getRestaurantNameSchema = require("./schema/getRestaurantNameSchema");
const createRestaurantSchema = require("./schema/createRestaurantSchema");
const signUpUserSchema = require("./schema/signUpUserSchema");
const loginUserSchema = require("./schema/loginUserSchema");
const commentOrReplySchema = require("./schema/commentOrReplySchema");
const seeRepliesSchema = require("./schema/seeRepliesSchema")

//Routes
const getAllRestarauntsOrByName = require("./routes/restaurants/getAllRestarauntsOrByName");
const getRestaurantById = require("./routes/restaurants/getRestaurantById");
const createRestaurant = require("./routes/restaurants/createRestaurant");
const updateRestaurant = require("./routes/restaurants/updateRestaurant");
const deleteRestaurant = require("./routes/restaurants/deleteRestaurant");
const fetchUser = require("./routes/user/fetchuser");
const signup = require("./routes/loginsignup/signup");
const logout = require("./routes/loginsignup/logout");
const favorite = require("./routes/user/favorite");
const restaurantRating = require("./routes/restaurants/restaurantRating");
const commentOrReply = require("./routes/comments/commentOrReply");
const seeReplies = require("./routes/comments/seeReplies");
const editComment = require("./routes/comments/editComment");
const getNewRestaraunts = require("./routes/restaurants/getNewRestaraunts");



/**secrets */
const PORT = process.env.PORT || 3001;
const SESSIONSECRET = process.env.SESSION_SECRET;
const GENSALT = process.env.GENSALT;
// const JWTSECRET = process.env.JWT_SECRET;

/** MIDDLEWARE */
app.set("trust proxy", 1);

app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(express.json());

// express session store
app.use(session(sessionConfig));

/** passport */
// passport sessions stuff
const passport = require("passport");
const initializePassport = require("./passportconfig");
const { restart } = require("nodemon");
const getAllRestarauntsByPagination = require("./routes/restaurants/getAllRestarauntsByPagination");

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
  isRestaurant,
  getRestaurantById
);

//get new restaurants
app.post(
  "/api/v1/newrestaurant",
  getAllRestarauntsByPagination
);

//create a reastaruant
app.post(
  "/api/v1/create_restaurant/",
  // createRestaurantSchema,
  // validateSchema,
  createRestaurant
);

//update restaraunt

app.patch("/api/v1/restaurant/:id", isAuth, isRestaurant, updateRestaurant);

//delete restaurants based on id
app.delete("/api/v1/restaurant/:id", isAuth, isRestaurant, deleteRestaurant);

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
    const voteValue = +req.body["voteValue"];

    if (!(voteValue in [1, 2, 3, 4, 5])) {
      return;
    }

    // IM Going to lock out the user after they voted so this check does not need to do
    // const result = await db.query(
    //   `SELECT * FROM user_favorites where user_id = $1 and restaurants_id =$2`,
    //   [userId, restaurantId]
    // ).then( res=> res.rows[0]);

    const result = await db.query(
      `INSERT INTO price_range (user_id, restaurants_id ,price) VALUES($1,$2, $3) returning *`,
      [userId, restaurantId, voteValue]
    );

    return res.json({ msg: "voted" });
  }
);

app.post("/api/v1/restaurantrating", isAuth, isRestaurant, restaurantRating);

app.post(
  "/api/v1/commentorreply",
  isAuth,
  isRestaurant,
  commentOrReplySchema,
  validateSchema,
  commentOrReply
);

app.post(
  "/api/v1/seereplies",
  isRestaurant,
  seeRepliesSchema,
  validateSchema,
  seeReplies
);

app.post("/api/v1/editcomment", isAuth,editComment )

app.get("/api/v1/getuserid",
  async (req,res)=>{

    // const usersId = await db.query(`
    //   select ARRAY(select id from yelp_users)
    // `).then( rows => rows["rows"][0]["array"])

    const restId = await db.query(`
    select ARRAY(select id from restaurants)
  `).then( rows => rows["rows"][0]["array"])

  let count=0
  for(let i=0; i< restId.length;i++){
    const chance = Math.random()*100
    if (chance >90 || i%( (7*i)%10)>6){
      count++
      continue
    }
    const alpha =  Math.random()*100
    let price
    if (alpha < 10){
      price =1
    }
    else if(alpha >=10 && alpha <25){
      price = 2
    }
    else if(alpha >=25 && alpha <55){
      price = 3
    }
    else if(alpha >=55 && alpha <80){
      price = 4
    } else if(alpha >=80){
      price = 5
    }
        
    try{
        await db.query(`
        insert into price_range (restaurants_id, price)
        values ($1, $2)
        `,[restId[i], price])
    }catch(err){
      console.log(err)
      continue
    }
      
    
  }

    return res.json({restId})
  }
)



app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server is up and listening on port ${PORT}`);
});
