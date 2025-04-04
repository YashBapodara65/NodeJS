const express = require("express");
const port = 1008;
const path = require("path");

const app = express();

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/bc_typography",(req,res)=>{
    res.render("bc_typography");
})

app.get("/bc_color",(req,res)=>{
    res.render("bc_color");
})

app.get("/icon-tabler",(req,res)=>{
    res.render("icon-tabler");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port :- "+port);
})