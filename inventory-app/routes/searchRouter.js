const { Router } = require('express');
const db = require('../controllers/queryCon');

const searchRouter = Router();

searchRouter.get('/', (req, res) => {
    res.render('addMovies');
});



module.exports = searchRouter;