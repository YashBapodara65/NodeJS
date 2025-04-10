const express = require("express")
const port = 1008;
const path = require("path");

const db = require("./config/db");
const schema = require("./model/firstSchema");

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",async(req,res)=>{
    await schema.find({}).then((bookData)=>{
        res.render("index",{bookData});
    })
});

app.get("/addBookNav",(req,res)=>{
    res.render("addBook");
});

app.post("/addBookData", async (req,res)=>{
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
})

app.get("/deleteBookData",async(req,res)=>{
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
})

app.get("/editBookData",async(req,res)=>{
    await schema.findById(req.query.id).then((data)=>{
        res.render("editBook",{data});
    })
})

app.post("/updateBookData",async(req,res)=>{
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/");
    })
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port : "+port);
})