const express = require("express");
const port = 1008;
const path = require("path")
const fs = require("fs");

const app = express();
const db =  require("./config/db");
const schema = require("./model/firstSchema");
const multer = require("./middleware/multer");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.get("/",async(req,res)=>{
    await schema.find({}).then((student)=>{
        res.render("index",{student})
    })
})

app.post("/addData",multer,async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file.path);
    req.body.image_path = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
})

app.get("/deleteData",async(req,res)=>{
    let singleData = await schema.findById(req.query.id);
    fs.unlinkSync(singleData.image_path)
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