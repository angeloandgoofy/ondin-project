const express = require('express');
const path = require("node:path")
const app = express();
const homeRouter = require("./routes/homeRouter");
const searchRouter = require("./routes/searchRouter");

const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use("/", homeRouter);
app.use("/", searchRouter);

app.listen(PORT, err  => {
    if(err){
        throw err;
    }
    console.log(`Listening on port ${PORT}`);
})