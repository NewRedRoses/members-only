const { Pool } = require("pg");
require("dotenv").config();

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;
module.exports = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432,
});
