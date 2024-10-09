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

module.exports = {
  addUserToDb,
  getPosts,
};
