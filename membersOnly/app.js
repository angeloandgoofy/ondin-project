const express = require('express')
const path = require('node:path')
const signupRouter = require('./routes/signupRouter');

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(signupRouter);

app.get("/", (req, res) => {
res.render('home');
});

app.listen(3000, err => {
    if(err){
        throw err;
    }

    console.log("App listening on port 3000");
})