const express = require("express")
const app = express()
const path = require("path")
const nunjucks = require("nunjucks")

/* nunjucks.configure('views', {
    autoescape: true,
    express: app
}); */

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"))
    // res.render("index.html").type("css")
})

app.listen(8000)