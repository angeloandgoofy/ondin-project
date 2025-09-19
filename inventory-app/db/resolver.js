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

async function getCat_movies() {
  try {
    const { rows } = await pool.query(`
      SELECT m.movie_id, m.name AS mName, m.img_data AS mImg, c.name AS catName
      FROM movies m
      JOIN c_movies cm ON cm.movie_id = m.movie_id
      JOIN category c ON c.category_id = cm.category_id
    `);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
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
  getCat_movies, 
  del_movie
};