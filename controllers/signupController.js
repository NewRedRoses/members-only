const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function signupRouteGet(req, res) {
  res.render("signup");
}
async function signupRoutePost(req, res, next) {
  try {
    const { first_name, last_name, email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) console.log("Something went wrong with hashing password");
      else {
        db.addUserToDb(first_name, last_name, email, hashedPassword);
        res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}
module.exports = { signupRouteGet, signupRoutePost };
