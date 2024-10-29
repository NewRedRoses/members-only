const { Pool } = require("pg");
require("dotenv").config();

const { PGHOST, PGUSER, DBDATABASE, PGPASSWORD, PGPORT } = process.env;
module.exports = new Pool({
  host: PGHOST,
  user: PGUSER,
  database: DBDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
});
