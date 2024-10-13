const db = require("../db/queries");

async function indexRouteGet(req, res, next) {
  const posts = await db.getPosts();
  res.render("index", { user: req.user, posts: posts });
}

module.exports = { indexRouteGet };
