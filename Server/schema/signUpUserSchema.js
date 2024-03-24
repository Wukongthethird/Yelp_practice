const { body, trim, isAlphanumeric } = require("express-validator");
const db = require("../DB");
const signUpUserSchema = [
  body("email")
    .exists()
    .isEmail()
    .withMessage("Please Enter an Email")
    .escape()
    .custom(async (value) => {
      // selects if restarant in db
      const existEmail = await db.query(
        "SELECT * FROM yelp_users where LOWER(email) = $1",
        [value]
      );

      const email = existEmail.rows[0];
      if (email) {
        throw new Error("That email is already associated with another user");
      }
    })
    .bail(),
  body("firstName")
    .exists()
    .withMessage("Enter a first name")
    .trim()
    .isAlpha()
    .isLength({ min: 1 })
    .escape(),
  body("lastName")
    .exists()
    .withMessage("Enter your surname")
    .trim()
    .isAlpha()
    .isLength({ min: 1 })
    .escape(),
  body("password")
    .exists()
    .isStrongPassword({
      minLength: 7,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .trim(),
  body("confirmPassword")
    .exists()
    .isStrongPassword({
      minLength: 7,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .trim(),
  body().custom((value) => {
    if (value.password !== value.confirmPassword) {
      throw new Error("The passwords do not match");
    }
  }),
];

module.exports = signUpUserSchema;
