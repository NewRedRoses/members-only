async function indexRouteGet(req, res, next) {
  res.render("index", { user: req.user });
}

module.exports = { indexRouteGet };
