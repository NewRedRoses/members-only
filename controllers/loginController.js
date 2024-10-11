const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("../db/queries");

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const usernames = await db.getUsernameFromDB(username);
      const user = usernames[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
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
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
}

module.exports = { loginRouteGet, loginRoutePost };
