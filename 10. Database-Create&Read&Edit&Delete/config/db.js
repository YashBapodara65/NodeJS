const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/Node5to6");

const db = mongoose.connection;

db.once("open",(err)=>{
    err ? console.log(err) : console.log("Database Successfully Connected");
})

module.exports = db;