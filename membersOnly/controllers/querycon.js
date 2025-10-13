const db = require('../db/resolver');
const { validationResult, matchedData } = require("express-validator");

async function signUp(req, res) {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).render('signup', {
        success: null,
        error: "Error sigining up"
      });
    }
    const { firstname, lastname, email, password } = req.body;
    await db.signup(firstname, lastname, email, password);

    res.render('signup', { 
      success: "Signup successful! 🎉", 
      error: null 
    });
  } catch (err) {
    console.error("ERROR WHILE SIGN UP: ", err);

    res.status(500).render('signup', { 
      success: null, 
      error: err.message || "An error occurred while signing up" 
    });
  }
}

module.exports = {
  signUp
};