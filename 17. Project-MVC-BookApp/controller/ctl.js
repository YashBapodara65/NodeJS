const schema = require("../model/firstSchema");

module.exports.readRecord = async (req,res) => {
    await schema.find().then((data)=>{
        res.render("index",{data});
    })
}

module.exports.addForm = (req,res) => {
    res.render("addBook");
}

module.exports.addRecord = async (req,res) => {
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
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/");
    })
}