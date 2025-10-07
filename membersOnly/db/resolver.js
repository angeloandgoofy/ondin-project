const pool = require('./pool');
const bcrypt = require('bcrypt');

async function signup(fname, lname, email, password){
    console.log(fname, lname, email, password);
    try{
        const { rows } = await pool.query(`
        SELECT email 
        FROM users
        where email = $1
        `, [email]);
        
        const checkEmail = rows[0];

        if(checkEmail){
            throw new Error("Email Already Exists");
        }
        if(password && password.trim() !== ""){
            const hash = await bcrypt.hash(password, 12);
            await pool.query(`
            INSERT INTO users(fname, lname, email, password)
            VALUES($1, $2, $3, $4)
            `, [fname, lname, email, hash]);
        }else {
            throw new Error("Password cannot be empty");
        }

    }catch(err){
        console.error("ERROR: SIGNING UP", err);
        throw err;
    }
}

module.exports = {
    signup
};