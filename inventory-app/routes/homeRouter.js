const { Router } = require('express');
const queryCon= require('../controllers/queryCon');

const homeRouter = Router();

homeRouter.get("/", queryCon.getCategories);

module.exports = homeRouter;
