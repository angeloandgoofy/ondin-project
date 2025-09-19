const { Router } = require('express');
const queryCon= require('../controllers/queryCon');

const homeRouter = Router();

homeRouter.get("/", queryCon.getCategories);
homeRouter.delete("/:movie_id", queryCon.del_movie);


module.exports = homeRouter;
