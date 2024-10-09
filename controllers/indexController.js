async function indexRouteGet(req, res, next) {
  res.render("index");
}

module.exports = { indexRouteGet };
