const { Router } = require('express');
const queryCon = require('../controllers/queryCon');

const searchRouter = Router();

searchRouter.get("/search", queryCon.category);
searchRouter.post("/search", queryCon.addMovietoCat);

module.exports = searchRouter;