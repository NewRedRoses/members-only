const db = require("../db/queries");
async function clubsRouteGet(req, res, next) {
  const clubs = await db.getClubs();
  res.render("clubs", { clubs: clubs });
}

module.exports = { clubsRouteGet };
