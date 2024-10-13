const { Router } = require("express");
const clubsRouter = Router();

const {
  clubsRouteGet,
  joinClubGet,
} = require("../controllers/clubsController");

clubsRouter.get("", clubsRouteGet);
clubsRouter.get("/:club_id/join", joinClubGet);

module.exports = clubsRouter;
