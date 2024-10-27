const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const pinLengthErr = "Passcode must be within 1 to 20 characters long.";
const emptyErr = "cannot be empty.";
const validatePin = [
  body("joinClubPasscode")
    .trim()
    .notEmpty()
    .withMessage(`Passcode ${emptyErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(pinLengthErr),
];
const validateClubCreation = [
  body("clubName").notEmpty().withMessage(`Club's name ${emptyErr}`),
  body("clubDescription")
    .notEmpty()
    .withMessage(`The description ${emptyErr}`)
    .isLength({ max: 500 })
    .withMessage("The description has to be less than 500 characters!"),
  body("passcode")
    .notEmpty()
    .withMessage(`The passcode ${emptyErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(pinLengthErr),
];
async function clubsRouteGet(req, res, next) {
  const clubs = await db.getClubs();
  res.render("clubs", { clubs: clubs });
}

async function joinClubGet(req, res, next) {
  // If user's logged in...
  if (req.user) {
    const dbPasscode = await db.getClubPasscode(req.params.id);
    const userPasscode = req.body.joinClubPasscode;
    if (userPasscode == dbPasscode) {
      await db.updateUserClub(req.params.id, req.user.id);
      res.redirect(`/clubs/${req.params.id}/view`);
    }
  }

  // res.redirect("/");
}

async function viewClubGet(req, res, next) {
  try {
    const club = await db.getClubInfo(req.params.id);
    const posts = await db.getPostsFromClubId(req.params.id);
    res.render("clubView", {
      club: club,
      posts: posts,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Loading Club Page");
  }
}
async function viewClubPost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("clubView", {
      club: await db.getClubInfo(req.params.id),
      posts: await db.getPostsFromClubId(req.params.id),
      user: req.user,
      errors: errors.array(),
    });
  }
  await db.createPost(
    req.body.message,
    req.body.title,
    req.user.id,
    req.user.club_id
  );
}

async function createClubGet(req, res, next) {
  res.render("createClub");
}
async function createClubPost(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("createClub", { errors: errors.array() });
  }

  const { clubName, clubDescription, passcode } = req.body;
  await db.createClub(clubName, clubDescription, passcode, req.user.id);
  res.redirect("/clubs");
}

module.exports = {
  clubsRouteGet,
  joinClubGet,
  viewClubGet,
  viewClubPost: [validatePin, viewClubPost],
  createClubGet,
  createClubPost: [validateClubCreation, createClubPost],
};
