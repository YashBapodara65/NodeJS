const schema =  require("../model/firstSchema")
const fs = require("fs");
const mailer = require("../middleware/mailer");

module.exports.login = (req,res) => {
    res.render("login");
}

module.exports.loginData = async (req,res) => {
    req.flash("success","Login Successfully");
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
    req.flash("success","User add successfully");
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
    req.flash("success","User update successfully");
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
    req.flash("success","User delete successfully");
    let singleRecord = await schema.findById(req.query.id);
    fs.unlinkSync(singleRecord.user_image);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/viewAdmin");
    })
}

module.exports.changePassword = async (req,res) => {
    res.render("changePassword");
}

module.exports.changePasswordRecord = async (req,res) => {
    let admin = req.user;
    if(admin.password == req.body.oldPass)
    {
        if(req.body.oldPass != req.body.newPass)
        {
            if(req.body.newPass == req.body.confirmPass)
            {
                await schema.findByIdAndUpdate(admin.id,{password:req.body.newPass}).then(()=>{
                    res.redirect("/logout");
                })
            }
            else
            {
                req.flash("error","New password and Confirm password does not match");
                res.redirect("/changePassword");
            }
        }
        else
        {
            req.flash("error","Old password and New password are match");
            res.redirect("/changePassword");
        }
    }
    else
    {
        req.flash("error","Old password does not match");
        res.redirect("/changePassword");
    }
}

module.exports.lostPassword = async (req,res) => {
    let admin = await schema.findOne({email:req.body.email});
    if(!admin)
    {
        return res.redirect("/");
    }
    let otp = Math.floor(Math.random() * 100000 + 900000);

    mailer.sendOtp(req.body.email,otp);
    req.session.otp = otp;
    req.session.adminData = admin;
    res.render("verifyPass"); 
}

module.exports.verifyPass = async (req,res) => {
    let otp = req.session.otp;
    let admin = req.session.adminData;

    if(otp == req.body.otp)
    {
        if(req.body.newPass == req.body.confirmPass)
        {
            await schema.findByIdAndUpdate(admin._id,{password:req.body.newPass}).then(()=>{
                res.redirect("/")
            })
        }
        else
        {
            req.flash("error","New password and Confirm password does not match")
            res.redirect("/");
        }
    }
    else
    {
        res.redirect("/")
    }
}