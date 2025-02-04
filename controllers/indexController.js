const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const postLengthErr = "is too long, please consider shortening it.";
const validatePost = [
  body("title")
    .trim()
    .optional()
    .isLength({ max: 50 })
    .withMessage(`The title ${postLengthErr}`),
  body("message")
    .notEmpty()
    .withMessage("Message cannot be empty!")
    .isLength({ max: 255 })
    .withMessage(`The message ${postLengthErr}`),
];

async function indexRouteGet(req, res, next) {
  const posts = await db.getPosts();
  let userClubDetails = undefined;
  if (req.user) {
    userClubDetails = await db.getClubInfo(req.user.club_id);
  }
  res.render("index", {
    user: req.user,
    posts: posts,
    club: userClubDetails,
  });
}
async function indexRoutePost(req, res, next) {
  const errors = validationResult(req);
  const clubInfo = await db.getClubInfo(req.user.club_id);

  if (!errors.isEmpty()) {
    return res.status(400).render("index", {
      user: req.user,
      posts: await db.getPosts(),
      errors: errors.array(),
      club: clubInfo,
    });
  }

  if (req.user) {
    await db.createPost(
      req.body.message,
      req.body.title,
      req.user.id,
      req.user.club_id
    );
    res.redirect("/");
  }
}
module.exports = {
  indexRouteGet,
  indexRoutePost: [validatePost, indexRoutePost],
};
