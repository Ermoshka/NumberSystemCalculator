const express = require("express")
const app = express()
const path = require("path")
const nunjucks = require("nunjucks")

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "index.html"))
    res.render("index")
})

app.listen(process.env.PORT)