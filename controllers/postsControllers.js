const db = require("../db/queries");

async function deletePost(req, res, next) {
  try {
    const { poster_user_id, club_owner_id } = await db.getPostDetails(
      req.params.id
    );
    if (poster_user_id == club_owner_id) {
      await db.deletePostFromId(req.params.id);
      res.redirect("back");
    } else {
      res.send("Unauthorized action performed");
    }
  } catch (err) {
    console.log(err);
    if (req.user == undefined) {
      res
        .status(500)
        .send("<b>ERROR:</b> <i>Unauthorized action performed.</i>");
    } else {
      res.status(500).send("<b>ERROR:</b> <i>Unable to delete post</i>");
    }
  }
}

module.exports = { deletePost };
