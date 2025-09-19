const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS category (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    name VARCHAR(50) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS movies (
    movie_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    name VARCHAR(100) UNIQUE,
    img_data TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS c_movies (
    movie_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (movie_id, category_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);

INSERT INTO category(name)
VALUES ('Action'), ('Drama'), ('Comedy'), ('Sci-Fi'), ('Horror');

INSERT INTO movies (name, img_data)
VALUES 
('American Pie', 'https://m.media-amazon.com/images/M/MV5BMTg3ODY5ODI1NF5BMl5BanBnXkFtZTgwMTkxNTYxMTE@._V1_FMjpg_UX1000_.jpg'),
('Terrifier', 'https://m.media-amazon.com/images/M/MV5BN2M5MzJlYzctNmZhOC00MTFmLWIxZmUtN2I4NzY5MTlmNDdmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg');

INSERT INTO c_movies(movie_id, category_id)
VALUES
(1, 3), 
(2, 5);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:4000/${process.env.DB_NAME}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("DONE");
}

main();