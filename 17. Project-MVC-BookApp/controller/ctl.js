const schema = require("../model/firstSchema");
const fs = require("fs");

module.exports.readRecord = async (req,res) => {
    await schema.find().then((data)=>{
        res.render("index",{data});
    })
}

module.exports.addForm = (req,res) => {
    res.render("addBook");
}

module.exports.addRecord = async (req,res) => {

    req.body.book_image = req.file.path;

    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
}

module.exports.deleteRecord = async (req,res) => {
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    }) 
}

module.exports.editRecord = async (req,res) => {
    await schema.findById(req.query.id).then((data)=>{
        res.render("editBook",{data});
    })
}

module.exports.updateRecord = async (req,res) => {

    let singleRecord = await schema.findById(req.body.id);
    let img;

    req.file ? img = req.file.path : img = singleRecord.book_image;
    req.file && fs.unlinkSync(singleRecord.book_image);

    req.body.book_image = img;

    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/");
    })
}