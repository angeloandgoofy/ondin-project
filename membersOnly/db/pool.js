require('dotenv').config();
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT, 10),
});

pool.connect()
  .then(client => {
    console.log("✅ Connected to DB");
    client.release();
  })
  .catch(err => console.error("❌ DB connection error", err));

module.exports = pool;