const { Router } = require('express');
const querycon = require('../controllers/querycon');
const signupRouter = Router();

signupRouter.get('/signup', (req, res) => {
    res.render('signup', {success: null, error: null})
});

signupRouter.post('/signup', querycon.signUp);

module.exports = signupRouter;