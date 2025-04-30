const express = require("express");
const port = 1008;
const db = require("./config/db");
const path = require("path");

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.use("/",require("./routes/route"));

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port :- "+port);
})