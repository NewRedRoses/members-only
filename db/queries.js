const pool = require("./pool");

async function addUserToDb(first_name, last_name, email, password) {
  try {
    const query = `INSERT INTO users (first_name,last_name,email,password) VALUES ($1,$2,$3,$4)`;
    const values = [first_name, last_name, email, password];
    await pool.query(query, values);
  } catch (err) {
    console.error(err);
  }
}
async function getPosts() {
  const query = `SELECT posts.id, posts.club_id, posts.date_posted, posts.title, posts.message, users.first_name ||' ' || users.last_name AS poster_name, clubs.name as club_name, clubs.owner_user_id AS club_owner_id
                 FROM posts
                 INNER JOIN users
                 ON posts.poster_user_id = users.id
                 INNER JOIN clubs
                 ON posts.club_id = clubs.id
                 LIMIT 10`;
  const { rows } = await pool.query(query);
  return rows;
}
async function getUsernameFromDB(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    username,
  ]);
  return rows;
}
async function getUserId(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows;
}
async function getClubs() {
  const query = `SELECT * FROM clubs`;
  const values = [];
  const { rows } = await pool.query(query, values);
  for (const club of rows) {
    const clubSize = { size: await getClubMemberAmount(club.id) };
    Object.assign(club, clubSize);
  }
  return rows;
}
async function updateUserClub(newClubId, userId) {
  const query = `UPDATE users SET club_id = $1 WHERE id = $2`;
  const values = [newClubId, userId];
  await pool.query(query, values);
}
async function createPost(message, title, userId, clubId) {
  const query = `INSERT INTO posts(message,title, poster_user_id,club_id) VALUES($1,$2,$3,$4)`;
  const values = [message, title, userId, clubId];
  await pool.query(query, values);
}
async function getClubMemberAmount(clubId) {
  const query = `SELECT COUNT(*) FROM users WHERE club_id = $1`;
  const values = [clubId];
  const { rows } = await pool.query(query, values);
  return rows[0].count;
}
async function getClubInfo(clubId) {
  const query = `SELECT * 
                 FROM clubs
                 WHERE id = $1`;
  const values = [clubId];
  const { rows } = await pool.query(query, values);
  return rows[0];
}
async function getPostsFromClubId(clubId) {
  const query = `SELECT posts.id, posts.club_id, posts.date_posted, posts.title, posts.message, users.first_name ||' ' || users.last_name AS poster_name, clubs.name AS club_name, clubs.owner_user_id as club_owner_id, users.id as user_id
                 FROM posts
                 INNER JOIN users
                 ON posts.poster_user_id = users.id
                 INNER JOIN clubs
                 ON posts.club_id = clubs.id
                 WHERE posts.club_id = $1`;
  const values = [clubId];
  const { rows } = await pool.query(query, values);
  return rows;
}
async function getClubPasscode(clubId) {
  const query = `SELECT passcode from clubs where id = $1`;
  const values = [clubId];
  const { rows } = await pool.query(query, values);
  return rows[0].passcode;
}
async function createClub(name, description, passcode, creatorUserId) {
  const query = `INSERT INTO clubs (name, description,passcode, owner_user_id) VALUES ($1,$2,$3,$4)`;
  const values = [name, description, passcode, creatorUserId];
  await pool.query(query, values);
}
async function deletePostFromId(postId) {
  const query = `DELETE FROM posts WHERE id = $1`;
  const values = [postId];
  await pool.query(query, values);
}
async function getPostDetails(postId) {
  const query = `SELECT posts.id as post_id, posts.title as post_title, posts.poster_user_id, clubs.id as club_id, clubs.owner_user_id as club_owner_id 
                 FROM posts
                 INNER JOIN clubs
                 ON posts.club_id = clubs.id
                 WHERE posts.id = $1`;
  const values = [postId];
  const { rows } = await pool.query(query, values);
  return rows[0];
}
module.exports = {
  addUserToDb,
  getPosts,
  getUsernameFromDB,
  getUserId,
  getClubs,
  updateUserClub,
  createPost,
  getClubMemberAmount,
  getClubInfo,
  getPostsFromClubId,
  getClubPasscode,
  createClub,
  deletePostFromId,
  getPostDetails,
};
