const { Router } = require("express");
const clubsRouter = Router();

const { clubsRouteGet } = require("../controllers/clubsController");

clubsRouter.get("", clubsRouteGet);

module.exports = clubsRouter;
