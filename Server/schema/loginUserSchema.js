const { body, trim, isAlphanumeric } = require("express-validator");
const db = require("../DB");
const loginUserSchema = [
  //i dont know if this is needed i think passport config has it cover
  body("email")
    .exists()
    .isEmail()
    .withMessage("Please Enter an Email")
    .escape(),
    // .custom(async (value) => {
    //   // selects if restarant in db
    //   const existEmail = await db.query(
    //     "SELECT * FROM yelp_users where LOWER(email) = $1",
    //     [value]
    //   );

    //   const email = existEmail.rows[0];
    //   console.log("user", email)
    //   if (!email) {
    //     throw new Error("There is no user associated with current email");
    //   }
    // })
    // .bail(),

  body("password")
    .exists()
];

module.exports = loginUserSchema;
