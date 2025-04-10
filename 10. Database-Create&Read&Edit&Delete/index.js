const express = require("express");
const port = 1008;

const app = express();
const db =  require("./config/db");
const schema = require("./model/firstSchema");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.get("/",async(req,res)=>{

    // way 1
    // let student = await schema.find({})
    // res.render("index",{student});

    // way 2
    await schema.find({}).then((student)=>{
        res.render("index",{student})
    })
})

app.post("/addData",async(req,res)=>{

    // way 1
    // let data = await schema.create(req.body);
    // data && res.redirect("/");

    // way 2
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
})

app.get("/deleteData",async(req,res)=>{
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
})

app.get("/editData",async(req,res)=>{
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data});
    })
});

app.post("/updateData",async(req,res)=>{
    // console.log(req.body);
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/");
    })
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port : "+port);
})