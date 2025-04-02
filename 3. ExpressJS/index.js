const express = require("express")
const port = 1008;

const app = express();

app.set("view engine","ejs");

let students = [
    {id : 1, name : "Yash", subject : "Node.JS"}
]

// display our data with internal
app.get("/",(req,res)=>{
    res.render("index",{students});
});

// display our data with external
// app.get("/",(req,res)=>{
//     res.write("<h1>welcome to nodejs</h1>");
//     res.write("welcome to nodejs");
//     res.end();
// });

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port : "+port);
});