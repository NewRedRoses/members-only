const { Router } = require("express");
const indexRouter = Router();

const { indexRouteGet } = require("../controllers/indexController");
indexRouter.get("", indexRouteGet);

module.exports = indexRouter;
