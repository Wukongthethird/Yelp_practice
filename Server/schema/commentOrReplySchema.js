const { body, trim, isAlphanumeric } = require("express-validator");

const commentOrReplySchema =[
  body("parentId").optional({ checkFalsy: true }).isNumeric(),
  body("commentMessage").exists().trim().isLength({min:1}).escape()
]

module.exports = commentOrReplySchema;