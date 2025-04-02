const express = require("express");
const port = 1008;

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))

let task_record = [];

app.get("/",(req,res)=>{
    res.render("index",{task_record});
})

app.post("/addTask",(req,res)=>{
    req.body.id = task_record.length + 1;
    task_record.push(req.body);
    res.redirect("/");
})

app.get("/deleteTask",(req,res)=>{
    let newTask = task_record.filter((item)=>item.id != req.query.id);
    task_record = newTask;
    res.redirect("/");
})

app.get("/editTask/:task_id",(req,res)=>{
    let single_task = task_record.find((item) => item.id == req.params.task_id);
    res.render("edit",{single_task});
    console.log(single_task);
})

app.post("/updateTask",(req,res)=>{
    task_record.map((e)=>{
        if(e.id == req.body.id)
        {
            e.task = req.body.title;
            e.priority = req.body.priority;
            e.status = req.body.status;
        }
        else
        {
            e;
        }
    })
    res.redirect("/");
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port :- "+port);
})