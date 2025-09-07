require('dotenv').config();
const { Pool } = require('pg');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER, // fixed from username -> user
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

const getPgVersion = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT version()');
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
};

const query = async (text, params = []) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params); // use pool directly
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

module.exports = { getPgVersion, query };
