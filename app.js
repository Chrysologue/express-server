const express = require("express");
const app = express();


function logAgent(req, res, next) {
    console.log("🔍 logAgent");
    next()
}
function authRequired(req, res, next) {
    console.log("🔐 authRequired");
    if(req.query.user === "admin")
    {
        next()
    }
    else {
        res.status(400).type("html").send("<h1>Forbidden</h1>")
    }
}
app.get("/", (req, res) => {
    console.log("Home is delivered");
    res.status(200).type("html").send("<h1>Hello! This is a Home page</h1>")
})

app.get("/admin", logAgent, authRequired, (req, res) => {
    res.status(200).type("html").send("<h1>Welcome, Admin</h1>")
})


const port = process.env.PORT;

app.listen(port, () => {
    console.log("Server is running")
})