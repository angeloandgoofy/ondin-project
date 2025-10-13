const { Router } = require('express');
const querycon = require('../controllers/querycon');
const signupRouter = Router();
const validateUser = require("../middleware/validateUser");


signupRouter.get('/signup', (req, res) => {
    res.render('signup', {success: null, error: null})
});

signupRouter.post('/signup', validateUser, querycon.signUp);

module.exports = signupRouter;