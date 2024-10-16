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
async function viewClubGet(req, res, next) {
  try {
    const club = await db.getClubInfo(req.params.id);
    const posts = await db.getPostsFromClubId(req.params.id);
    res.render("clubView", { club: club, posts: posts });
  } catch (err) {
    console.error("Error retrieving user:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { clubsRouteGet, joinClubGet, viewClubGet };
