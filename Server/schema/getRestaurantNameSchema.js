const {  query } = require("express-validator")

const getRestaurantNameSchema =  [
   query('restaurantsName').trim().optional().isAlphanumeric().escape()
]

module.exports = getRestaurantNameSchema;