const schema = require("../model/firstschema");
const fs = require("fs");

module.exports.home = async (req,res) => {
    await schema.find().then((data)=>{
        res.render("index",{data});
    })
}

module.exports.add = (req,res)=>{
    res.render("add");
}

module.exports.addRecord = async (req,res) => {
    req.body.movie_img = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
}

module.exports.editRecord = async (req,res) => {
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data});
    })
}

module.exports.updateRecord = async (req,res) => {
    let singleData = await schema.findById(req.body.id);
    let img = "";

    req.file ? img = req.file.path : img = singleData.movie_img;
    req.file && fs.unlinkSync(singleData.movie_img);

    req.body.movie_img = img;
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/");
    })
}

module.exports.deleteRecord = async (req,res) => {
    let singleData = await schema.findById(req.query.id);

    fs.unlinkSync(singleData.movie_img);

    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
}