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
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function del_movie(m_name) {
    await pool.query(`
        DELETE FROM movies WHERE name = ($1)`, [m_name]);
}

module.exports = {
  categories, 
  getCat_movies, 
  del_movie
};