const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    fname text,
    lname text
);

CREATE TABLE IF NOT EXISTS posts (
    post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title text, 
    description text, 
    user_id uuid,
    created_at timestamptz NOT NULL DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
`

async function main() {
    console.log("...seeding");
    const client = new Client({
        connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:4000/${process.env.DB_NAME}`,
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("DONE");
}

main();