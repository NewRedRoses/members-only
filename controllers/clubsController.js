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
    res.render("clubView", { club: club, posts: posts, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Loading Club Page");
  }
}
async function viewClubPost(req, res, next) {
  const dbPasscode = await db.getClubPasscode(req.params.id);
  const userPasscode = req.body.passcode;
  if (userPasscode == dbPasscode) {
    await db.updateUserClub(req.params.id, req.user.id);
    res.redirect("/clubs");
  } else {
    res.redirect("/");
  }
}

async function createClubGet(req, res, next) {
  res.render("createClub");
}
async function createClubPost(req, res, next) {
  const { clubName, clubDescription, passcode } = req.body;
  await db.createClub(clubName, clubDescription, passcode, req.user.id);
  res.redirect("clubs");
}

module.exports = {
  clubsRouteGet,
  joinClubGet,
  viewClubGet,
  viewClubPost,
  createClubGet,
  createClubPost,
};
