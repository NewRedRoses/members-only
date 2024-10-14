const db = require("../db/queries");

async function indexRouteGet(req, res, next) {
  const posts = await db.getPosts();
  res.render("index", { user: req.user, posts: posts });
}
async function indexRoutePost(req, res, next) {
  if (req.user) {
    await db.createPost(
      req.body.message,
      req.body.title,
      req.user.id,
      req.user.club_id
    );
    res.redirect("/");
  }
}
module.exports = { indexRouteGet, indexRoutePost };
