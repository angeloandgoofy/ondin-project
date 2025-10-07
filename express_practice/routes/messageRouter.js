const {Router} = require("express");

const messageRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

messageRouter.get("/", (req, res) => 
    res.render("index", {title:" Mini MessageBoard", messages: messages})
);

messageRouter.get("/new", (req, res) => 
    res.render("form")
);

messageRouter.post("/messages", (req, res) => {
    const msg = req.body.message;
    const username = req.body.username;
    messages.push({text: msg, user: username, added: new Date()});
    res.redirect("/")
})
module.exports = messageRouter;