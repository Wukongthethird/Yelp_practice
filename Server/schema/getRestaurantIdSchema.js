const { param } = require("express-validator")
const getRestaurantIdSchema =  [
  param('id').exists().isNumeric()
]

module.exports = getRestaurantIdSchema;