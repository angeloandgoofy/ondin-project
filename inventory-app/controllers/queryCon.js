const db = require('../db/resolver')

async function getCat_movie(req, res) {
  try {
    const [movies, movie_cat] = await Promise.all([
      db.movies(), 
      db.getCat_movies()
    ]);
    res.render('home', { movie_cat: Array.isArray(movie_cat) ? movie_cat : [], movies: movies});  } 
    catch (err) {
        console.error("Error in getCategories controller:", err);
        res.status(500).send("Server error while fetching categories");
  }
}

async function del_movie(req, res) {
  try{
    await db.del_movie(Number(req.params.movie_id));
    res.redirect("/");
    }catch(err){
    console.err("ERROR DELETING FROM DB: ", err);
    res.status(500).send("Server error while deleting or fetching");
  }
}



module.exports = {
    getCat_movie, 
    del_movie
};