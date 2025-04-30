const express = require("express");
const port = 2003;
const db = require("./config/db");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(cookieParser());

app.use("/",require("./routes/route"));

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port :- "+port);
})