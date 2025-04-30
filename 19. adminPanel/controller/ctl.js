const schema =  require("../model/firstSchema")
const fs = require("fs");

module.exports.login = (req,res) => {
    res.render("login");
}

module.exports.loginData = async (req,res) => {
    let admin = await schema.findOne({email : req.body.email});
    if(!admin)
    {
        return res.redirect("/");
    }

    if(admin.password == req.body.password)
    {
        res.cookie("admin",admin)
        res.redirect("/dashboard")
    }
    else
    {
        res.redirect("/");
    }
}

module.exports.logout = (req,res) => {
    res.clearCookie("admin");
    res.redirect("/");
}

module.exports.home = (req,res) => {
    if(req.cookies.admin)
    {
        res.render("dashboard");
    }
    else
    {
        res.redirect("/");
    }
}

module.exports.addAdmin = (req,res) => {
    if(req.cookies.admin)
    {
        res.render("addAdmin");
    }
    else
    {
        res.redirect("/");
    }
}

module.exports.addRecord = async (req,res) => {
    req.body.user_image = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/addAdmin");
    })
}

module.exports.viewRecord = async (req,res) => {
    if(req.cookies.admin)
    {
        await schema.find().then((data)=>{
            res.render("viewAdmin",{data});
        })
    }
    else
    {
        res.redirect("/");
    }
}

module.exports.editRecord = async (req,res) => {
    let singleRecord = await schema.findById(req.query.id).then((data)=>{
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