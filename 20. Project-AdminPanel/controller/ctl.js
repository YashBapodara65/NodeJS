const schema = require("../model/firstSchema");
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
        res.cookie("admin2",admin);
        res.redirect("/dashboard");
    }
    else
    {
        res.redirect("/");
    }
}

module.exports.logout = (req,res) => {
    res.clearCookie("admin2");
    res.redirect("/");
}

module.exports.dashboard = (req,res) => {
    if(req.cookies.admin2)
    {
        res.render("index");
    }
    else
    {
        res.redirect("/");
    }
}

module.exports.addAdmin = (req,res) => {
    if(req.cookies.admin2)
    {
        res.render("addAdmin");
    }
    else
    {
        res.redirect("/");
    }
}

module.exports.addRecord = async (req,res) => {
    if(req.cookies.admin2)
    {
        req.body.profile = req.file.path;
        await schema.create(req.body).then(()=>{
            res.redirect("/addAdmin");
        })
    }
    else
    {
        res.redirect("/");
    }
}

module.exports.viewAdmin = async (req,res) => {
    if(req.cookies.admin2)
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

module.exports.deleteRecord = async (req,res) => {
    if(req.cookies.admin2)
    {
        let singleRecord = await schema.findById(req.query.id);
        fs.unlinkSync(singleRecord.profile);
        await schema.findByIdAndDelete(req.query.id).then(()=>{
            res.redirect("viewAdmin");
        })
    }
    else
    {
        res.redirect("/");
    }
}

module.exports.editAdmin = async (req,res) => {
    if(req.cookies.admin2)
    {
        await schema.findById(req.query.id).then((data)=>{
            res.render("editAdmin",{data});
        });
    }
    else
    {
        res.redirect("/");
    }
}

module.exports.updateRecord = async (req,res) => {
    let singleRecord = await schema.findById(req.body.id);
    let img;

    req.file ? img = req.file.path : img = singleRecord.profile;
    req.file && fs.unlinkSync(singleRecord.profile);

    req.body.profile = img;

    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/viewAdmin");
    })

}