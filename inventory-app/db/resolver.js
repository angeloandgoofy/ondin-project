const pool = require('./pool');

async function categories() {
  try {
    const { rows } = await pool.query('SELECT name FROM category');
    return rows;
  } catch (err) {
    console.error("DB error in categories():", err);
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

async function del_movie(id) {
  try {
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
  del_movie
};