const { Router } = require("express");
const { deletePost } = require("../controllers/postsControllers");

const deleteRouter = Router();

deleteRouter.get("/post/:id", deletePost);

module.exports = deleteRouter;
