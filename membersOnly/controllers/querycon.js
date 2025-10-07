const db = require('../db/resolver');

async function signUp(req, res) {
  try {
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