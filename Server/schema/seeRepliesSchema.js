const { body, trim, isAlphanumeric } = require("express-validator");

const seeReplies =[
  body("parentId").isNumeric().escape(),
]

module.exports = seeReplies;