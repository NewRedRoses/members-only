const pool = require("./pool");

async function addUserToDb(first_name, last_name, email, password) {
  try {
    const query = `INSERT INTO users (first_name,last_name,email,password_hash) VALUES ($1,$2,$3,$4)`;
    const values = [first_name, last_name, email, password];
    await pool.query(query, values);
  } catch (err) {
    console.log(err);
  }
}
async function getPosts() {
  const query = `SELECT * FROM posts LIMIT 10`;
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
  return rows;
}
async function updateUserClub(newClubId, userId) {
  const query = `UPDATE users SET club_id = $1 WHERE id = $2;`;
  const values = [newClubId, userId];
  await pool.query(query, values);
}

module.exports = {
  addUserToDb,
  getPosts,
  getUsernameFromDB,
  getUserId,
  getClubs,
  updateUserClub,
};
