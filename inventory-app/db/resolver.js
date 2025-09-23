const pool = require('./pool');
const bcrypt = require("bcrypt");

async function categories() {
  try {
    const { rows } = await pool.query('SELECT * FROM category');
    return rows;
  } catch (err) {
    console.error("DB error in categories:", err);
    throw err; 
  }
}

async function movies(){
  try{
    const {rows} = await pool.query(`SELECT * FROM movies`);
    return rows;
  }catch(error){
    console.error("Error fetching movies: ", error);
    throw err;
  }
}

async function specific_movie_id(movie, img_data, password) {
  try {
    let userId = null;
    if(password && password.trim() != ""){
      const hash = await bcrypt.hash(password, 12);
      const { rows } = await pool.query( 
        `INSERT INTO users(password)
        VALUES($1)
        RETURNING user_id`,
      [hash]
      );
      userId = rows[0].user_id;
    }

    const { rows } = await pool.query(
      `INSERT INTO movies (name, img_data, user_id)
       VALUES ($1, $2, $3)
       RETURNING movie_id`,
      [movie, img_data, userId]
    );
    return rows;
  } catch (err) {
    console.error("Error fetching movie:", err);
    throw err;
  }
}

async function getCat_movies() {
  try {
    const { rows } = await pool.query(`
      SELECT m.movie_id, m.name AS mName, m.img_data AS mImg, c.name AS catName
      FROM movies m
      JOIN c_movies cm ON cm.movie_id = m.movie_id
      JOIN category c ON c.category_id = cm.category_id
    `);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCat_movieArray() {
  try {
    const { rows } = await pool.query(`
      SELECT 
        c.name AS category,
        json_agg(json_build_object('movie_id', m.movie_id, 'name', m.name, 'img', m.img_data)) AS movies
      FROM movies m
      JOIN c_movies cm ON cm.movie_id = m.movie_id
      JOIN category c ON c.category_id = cm.category_id
      GROUP BY category
    `);
    return rows;
  } catch (error) {
    console.error("Error getting array of movies", error);
    throw error;
  }
}

async function insertCat_movies(mId, cId) {
  try{
    await pool.query(`
      INSERT INTO c_movies(movie_id, category_id)
      VALUES ($1, $2)
    `, [mId, cId]);
  }catch(error){
    console.error("Error inserting into category movie table");
    throw error;
  }
}

async function insertMovies(name, img_data){
  try{
    await pool.query(`
      INSERT INTO movies(name, img_data)
      VALUES ($1, $2)
    `, [name, img_data])
  }catch(error){
    console.error("Error inserting movie");
    throw error;
  }
}

async function del_movie(id, password) {
  try {
    const { rows } = await pool.query(
      `
      SELECT u.password
      FROM movies m
      LEFT JOIN users u ON u.user_id = m.user_id
      WHERE m.movie_id = $1
      `,
      [id]
    );

    if (rows.length === 0) {
      throw new Error('Movie not found');
    }

    const passW = rows[0].password;

    if (passW) {
      const match = await bcrypt.compare(password, passW);
      if (!match) {
        throw new Error('Invalid password — cannot delete movie');
      }
    }
    await pool.query(`DELETE FROM movies WHERE movie_id = $1`, [id]);
  } catch (err) {
    console.error('Error deleting movie:', err);
    throw err;
  }
}

module.exports = {
  categories, 
  movies,
  getCat_movies, 
  del_movie,
  getCat_movieArray, 
  insertCat_movies,
  insertMovies,
  specific_movie_id
};