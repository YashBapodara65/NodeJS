const express = require("express");
const db =  require("./config/db");
const port = 1008;

const app = express();

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port : "+port);
})