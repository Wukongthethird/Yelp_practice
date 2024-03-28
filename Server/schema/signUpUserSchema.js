const { body, trim, isAlphanumeric } = require("express-validator");
const db = require("../DB");
const signUpUserSchema = [
  body("email")
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
    .trim()
    .isAlpha()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Required first name"),
  body("lastName")
    .trim()
    .isAlpha()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Required first name"),
  body("password")
    .isStrongPassword({
      minLength: 7,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "password does not meet requirement of 7 characters, 1 Uppercase character, 1 number and 1 symbol."
    )
    .trim(),
  // body("confirmPassword")
  //   .exists()
  //   .isStrongPassword({
  //     minLength: 7,
  //     minUppercase: 1,
  //     minNumbers: 1,
  //     minSymbols: 1,
  //   })
  //   .trim(),
  body().custom((value) => {
    if (value.password !== value.confirmPassword) {
      throw new Error("The passwords do not match");
    }
    return value.password === value.confirmPassword;
  }),
];

module.exports = signUpUserSchema;
