const schema = require("../model/firstSchema");
const fs = require("fs");

module.exports.firstPage = async (req,res) => {
    await schema.find().then((data)=>{
        res.render("index",{data});
    })
}

module.exports.secondPage = async (req,res) => {
    // console.log(req.body);
    req.body.image_path = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
}

module.exports.deletePage = async (req,res) => {
    // console.log(req.query.id);
    let singleData = await schema.findById(req.query.id);
    fs.unlinkSync(singleData.image_path)
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
}

module.exports.editPage = async (req,res) => {
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data});
    })
}

module.exports.updatePage = async (req,res) => {

    let singleData = await schema.findById(req.body.id);
    let img = "";

    req.file ? img = req.file.path : img = singleData.image_path;
    req.file && fs.unlinkSync(singleData.image_path);

    req.body.image_path = img;

    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/");
    })
}