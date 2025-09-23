const { Router } = require('express');
const queryCon= require('../controllers/queryCon');

const homeRouter = Router();

homeRouter.get("/", queryCon.getArray_movies);
homeRouter.post('/:movie_id/delete', queryCon.del_movie);


module.exports = homeRouter;
