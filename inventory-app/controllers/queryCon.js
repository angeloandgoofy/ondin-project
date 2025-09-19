const db = require('../db/resolver')

async function getCategories(req, res) {
  try {
    const movie_cat = await db.getCat_movies();
    res.render('home', { movie_cat: Array.isArray(movie_cat) ? movie_cat : [] });  } 
    catch (err) {
        console.error("Error in getCategories controller:", err);
        res.status(500).send("Server error while fetching categories");
  }
}



module.exports = {
    getCategories
};