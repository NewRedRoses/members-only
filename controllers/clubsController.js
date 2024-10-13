const db = require("../db/queries");
async function clubsRouteGet(req, res, next) {
  const clubs = await db.getClubs();
  res.render("clubs", { clubs: clubs });
}
async function joinClubGet(req, res, next) {
  // If user's logged in...
  if (req.user) {
    await db.updateUserClub(req.params.club_id, req.user.id);
  }
  res.redirect("/");
}

module.exports = { clubsRouteGet, joinClubGet };
