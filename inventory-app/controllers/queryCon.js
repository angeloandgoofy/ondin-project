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

async function del_movie(req, res) {
  try{
    const {movie_id} = req.params;
    console.log("THIS IS THE MOVIE ID: ", movie_id);
    await db.del_movie(Number(movie_id));
    const movie_cat = await db.getCat_movies();
      res.render('home', {
        movie_cat: Array.isArray(movie_cat) ? movie_cat : [],
        success: 'Movie deleted successfully'
      });
    }catch(err){
    console.err("ERROR DELETING FROM DB");
    res.status(500).send("Server error while deleting or fetching");
  }
}

module.exports = {
    getCategories, 
    del_movie
};