const { Router } = require("express");
const loginRouter = Router();

const {
  loginRouteGet,
  loginRoutePost,
} = require("../controllers/loginController");

loginRouter.get("", loginRouteGet);
loginRouter.post("", loginRoutePost);

module.exports = loginRouter;
