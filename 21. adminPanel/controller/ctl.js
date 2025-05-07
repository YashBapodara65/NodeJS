const schema =  require("../model/firstSchema")
const fs = require("fs");

module.exports.login = (req,res) => {
    res.render("login");
}

module.exports.loginData = async (req,res) => {
    res.redirect("/dashboard")
}

module.exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports.home = (req,res) => {
    res.render("dashboard");
}

module.exports.profile = (req,res) => {
    res.render("profile");
}

module.exports.addAdmin = (req,res) => {
    res.render("addAdmin");
}

module.exports.addRecord = async (req,res) => {
    req.body.user_image = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/addAdmin");
    })
}

module.exports.viewRecord = async (req,res) => {
    await schema.find().then((data)=>{
        res.render("viewAdmin",{data});
    })
}

module.exports.editRecord = async (req,res) => {
    await schema.findById(req.query.id).then((data)=>{
        res.render("editAdmin",{data});
    });
}

module.exports.updateRecord = async (req,res) => {
    let singleRecord = await schema.findById(req.body.id);
    let img;

    req.file ? img = req.file.path : img = singleRecord.user_image;
    req.file && fs.unlinkSync(singleRecord.user_image);

    req.body.user_image = img;

    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/viewAdmin");
    })
}

module.exports.deleteRecord = async (req,res) => {
    let singleRecord = await schema.findById(req.query.id);
    fs.unlinkSync(singleRecord.user_image);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/viewAdmin");
    })
}