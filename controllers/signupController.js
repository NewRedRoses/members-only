const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const emptyFieldErr = "cannot be empty.";

const validateSignUp = [
  body("first_name").notEmpty().withMessage(`First name ${emptyFieldErr}`),
  body("last_name").optional(),
  body("email")
    .notEmpty()
    .withMessage(`Email ${emptyFieldErr}`)
    .isEmail()
    .withMessage("Email must be in email format."),
  body("password")
    .isLength({ min: 5 })
    .withMessage("The password must be longer than 5 characters.")
    .isLength({ max: 25 })
    .withMessage("The password must be less than 25 characters."),
  body("confirmPassword").custom((value, { req }) => {
    if (value === req.body.password) return true;
    else throw new Error("Password & its confirmation do not match!");
  }),
];
async function signupRouteGet(req, res) {
  res.render("signup");
}
async function signupRoutePost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { errors: errors.array() });
    }
    const { first_name, last_name, email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) console.log("Something went wrong with hashing password");
      else {
        await db.addUserToDb(first_name, last_name, email, hashedPassword);
        res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}
module.exports = {
  signupRouteGet,
  signupRoutePost: [validateSignUp, signupRoutePost],
};
