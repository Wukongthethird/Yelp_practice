"use strict";
require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
var cors = require("cors");
const bcrypt = require("bcrypt");
var session = require('express-session');

const PORT = process.env.PORT || 3001;
const db = require("./DB");

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());


// TODO safer methods and middlewears look at react and previus projects
// app.use((req, res, next) => {
//   console.log("im middlewhere");
//   next();
// });

// get all restaraunts or all restaurants on search data
app.get("/api/v1/restaurants", async (req, res) => {
  console.log(req.query)
  if (req.query["restaurantsName"]) {
    try {
      const restaurantsName = req.query["restaurantsName"];
      const results = await db.query(
        "select * from restaurants where LOWER(restaurants_name) like   ('%'||$1||'%')",
        [restaurantsName]
      );
      if (!results) {
        res.status(204).json({
          restaurants: "",
        });
      }
      res.status(200).json({
        restaurants: [results["rows"][0]],
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const results = await db.query("select * from restaurants");
      res.status(200).json({
        restaurants: results["rows"],
      });
    } catch (err) {
      console.log(err);
    }
  }
});

// get a restaraunt by id
app.get("/api/v1/restaurant/:id", async (req, res) => {
  try {
    const result = await db.query("select * from restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      restaurant: result["rows"][0],
    });
  } catch (err) {
    console.log(err);
  }
});

//create a reastaruant
app.post("/api/v1/create_restaurant/", async (req, res) => {

  const sqlInput = Object.values(req.body);

  try {
    const result = await db.query(
      `INSERT INTO 
      restaurants (restaurants_name, address_location, city, zipcode, price_range) 
      VALUES ($1,$2,$3,$4,$5)
      returning * `,
      sqlInput
    );

    res.status(201).json({
      restaurant: result["rows"][0],
    });
  } catch (err) {
    console.log(err);
  }
});

//update restaraunt

app.put("/api/v1/restaurant/:id", async (req, res) => {
  let allowedColumns = [
    "restaurants_name",
    "address_location",
    "city",
    "zipcode",
    "price_range",
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
 *  Create new user and add to DB. Redirect to home page.

    If data not valid, return err.
 */
app.post("/api/v1/restaurant/signup" , async (req,res)=>{
  console.log("hello")
  const passhash = req.body["password"]

  
} )



app.post("/api/v1/restaurants/", (req, res) => {});
app.listen(PORT, () => {
  console.log(`server is up and listening on port ${PORT}`);
});


// converts camel case to snake case

const camelToSnakeCase = (str)=>{
  return str.replace(/[A_Z]/g, c => `_${c.toLowerCase()}` )
};


const snakeToCamelCase = (str)=>{
  let snakeSplit = str.split("_")
  for(let i=1; i<snakeSplit.length; i++){
    snakeSplit[0] = snakeSplit[0].toUpperCase();
  }
  return snakeSplit.join("")

};
