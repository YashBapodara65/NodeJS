const express = require("express")
const port = 1008;

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

let students = [
    {id : 1, name : "Yash", subject : "Node.JS"}
]

app.get("/",(req,res)=>{
    res.render("index",{students});
});

app.post("/addData",(req,res)=>{
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.subject);

    // way 1 to add id field in student object
    // let obj = {id:students.length+1,name : req.body.name, subject: req.body.subject}
    // students.push(obj);

    // way 2 to add id field
    req.body.id = students.length + 1;
    students.push(req.body);
    res.redirect("/");
})

app.get("/deleteData",(req,res)=>{
    console.log(req.query);
    let newData = students.filter((e)=> e.id != req.query.id);
    students = newData;
    res.redirect("/");
});

app.post("/updateData",(req,res)=>{
    // console.log(req.body);
    students.forEach((item)=>{
        if(item.id == req.body.id)
        {
            item.name = req.body.name;
            item.subject = req.body.subject;
        }
        else
        {
            item;
        }
    });
    res.redirect("/");
});

app.get("/editData/:id",(req,res)=>{
    let singleData = students.find((item)=> item.id == req.params.id);
    res.render("edit",{singleData});
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port : "+port);
});