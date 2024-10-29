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

clubsRouter.get("/:id/view", viewClubGet);
clubsRouter.post("/:id/new", viewClubPost);

clubsRouter.post("/:id/join", joinClubGet);

clubsRouter.get("/new", createClubGet);
clubsRouter.post("/new", createClubPost);

module.exports = clubsRouter;
