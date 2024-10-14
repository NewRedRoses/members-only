const { Router } = require("express");
const indexRouter = Router();

const {
  indexRouteGet,
  indexRoutePost,
} = require("../controllers/indexController");
indexRouter.get("", indexRouteGet);
indexRouter.post("", indexRoutePost);

module.exports = indexRouter;
