const { Router } = require("express");

const signupRouter = Router();

const {
  signupRouteGet,
  signupRoutePost,
} = require("../controllers/signupController");

signupRouter.get("", signupRouteGet);
signupRouter.post("", signupRoutePost);

module.exports = signupRouter;
