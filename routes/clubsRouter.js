const { Router } = require("express");
const clubsRouter = Router();

const {
  clubsRouteGet,
  joinClubGet,
  viewClubGet,
  viewClubPost,
  createClubGet,
  createClubPost,
} = require("../controllers/clubsController");

clubsRouter.get("", clubsRouteGet);

clubsRouter.get("/:id", viewClubGet);
clubsRouter.post("/:id", viewClubPost);

clubsRouter.get("/new", createClubGet);
clubsRouter.post("/new", createClubPost);

module.exports = clubsRouter;
