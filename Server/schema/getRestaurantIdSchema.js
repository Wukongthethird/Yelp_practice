const { param } = require("express-validator")

const getRestaurantIdSchema =  [
  param('id').exists().trim().isNumeric().escape()
]

module.exports = getRestaurantIdSchema;