const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const emptyMessage = "cannot be empty.";
const validateLogin = [
  body("username")
    .notEmpty()
    .withMessage(`username ${emptyMessage}`)
    .isEmail()
    .withMessage("Must be in email (@) format."),
  body("password").notEmpty().withMessage(`password ${emptyMessage}`),
];

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const usernames = await db.getUsernameFromDB(username);
      const user = usernames[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const rows = await db.getUserId(id);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

async function loginRouteGet(req, res, next) {
  res.render("login");
}
function loginRoutePost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).render("login", { errors: errors.array() });
  }

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
}

module.exports = {
  loginRouteGet,
  loginRoutePost: [validateLogin, loginRoutePost],
};
