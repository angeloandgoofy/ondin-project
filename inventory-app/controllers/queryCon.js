const db = require('../db/resolver');

async function category(req, res) {
  try{
    const category = await db.categories();
    res.render('addMovies', {category: Array.isArray(category) ? category : []});
  }catch(error){
    console.error("Error fetching category"); 
    res.status(500).send("Server error while fetching category");
  }
}

async function getCat_movie(req, res) {
  try {
    const movie_cat = await db.getCat_movies();
    res.render('home', { movie_cat: Array.isArray(movie_cat) ? movie_cat : []}); 
  } catch (err) {
    console.error("Error in getCategories controller:", err);
    res.status(500).send("Server error while fetching categories");
  }
}

async function getArray_movies(req, res) {
  try {
    const movie_cat = await db.getCat_movieArray();
    res.render('home', {movie_cat: Array.isArray(movie_cat) ? movie_cat : []});
    
  }catch(error){
    console.error("Error getting array of movies");
    res.status(500).send("Server error while fetching array of movies");
  }
}

async function del_movie(req, res) {
  try{
    const numberId = Number(req.params.movie_id);
    const {Password} = req.body;
    await db.del_movie(numberId, Password);
    res.redirect("/");
    }catch(err){
    console.error("ERROR DELETING FROM DB: ", err);
    res.status(500).send("Server error while deleting or fetching");
  }
}

async function addMovietoCat(req, res) {
  try{
    const { movie, img_data, Password, category } = req.body;
    const categoryId = parseInt(category, 10);
    const movieId =await db.specific_movie_id(movie, img_data, Password);
    const mId = movieId[0].movie_id;

    await db.insertCat_movies(mId, categoryId);
    res.redirect('/');
  } catch (error) {
    console.error("Error adding movie to category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateMovie(req, res){
  try{
    const {id} = req.params;
    const {name, img} = req.body;
    await db.updateMovie(id, name, img);
    const movie_cat = await db.getCat_movieArray();
    res.render('home', {movie_cat: Array.isArray(movie_cat) ? movie_cat : []});
    }catch(err){
    console.error("Error updating movie");
    res.status(500).json({err: "Internal server error"});
  }
}

module.exports = {
    getCat_movie, 
    del_movie, 
    getArray_movies, 
    category, 
    addMovietoCat,
    updateMovie
};