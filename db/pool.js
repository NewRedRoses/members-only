const { Pool } = require("pg");
require("dotenv").config();

const { PGHOST, PGUSER, DBDATABASE, PGPASSWORD, PGPORT } = process.env;
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
