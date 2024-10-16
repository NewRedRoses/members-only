const { Router } = require("express");
const clubsRouter = Router();

const {
  clubsRouteGet,
  joinClubGet,
  viewClubGet,
} = require("../controllers/clubsController");

clubsRouter.get("", clubsRouteGet);
clubsRouter.get("/:id", viewClubGet);
clubsRouter.get("/:club_id/join", joinClubGet);

module.exports = clubsRouter;
