const schema = require("../model/firstSchema");
const fs = require("fs");
const mailer = require("../middleware/mailer");

module.exports.login = (req,res) => {
    res.render("login");
}

module.exports.loginData = async (req,res) => {
    res.redirect("/dashboard");
}

module.exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports.dashboard = (req,res) => {
    res.render("index");
}

module.exports.profile = (req,res) => {
    res.render("profile")
}

module.exports.addAdmin = (req,res) => {
    res.render("addAdmin");
}

module.exports.addRecord = async (req,res) => {
    req.body.profile = req.file.path;
    await schema.create(req.body).then(()=>{
        req.flash("success","user add successfully")
        res.redirect("/addAdmin");
    })
}

module.exports.viewAdmin = async (req,res) => {
    await schema.find().then((data)=>{
        res.render("viewAdmin",{data});
    })
}

module.exports.deleteRecord = async (req,res) => {
    let singleRecord = await schema.findById(req.query.id);
    fs.unlinkSync(singleRecord.profile);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        req.flash("success","user delete successfully")
        res.redirect("viewAdmin");
    })
}

module.exports.editAdmin = async (req,res) => {
    await schema.findById(req.query.id).then((data)=>{
        res.render("editAdmin",{data});
    });
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

module.exports.changePassword = (req,res) => {
    res.render("changePassword")
}

module.exports.updatePassword = async (req,res) => {
    let admin = req.user;

    if(admin.password == req.body.oldpass)
        {
            if(req.body.oldpass != req.body.password)
            {
                if(req.body.password == req.body.confirmpass)
                {
                    await schema.findByIdAndUpdate(admin.id,{password:req.body.password}).then(()=>{
                        res.redirect("/logout");
                    })
                }
                else
                {
                    req.flash("error","new password and confirm password does not match");
                    res.redirect("changePassword")
                }
            }
            else
            {
                req.flash("error","old password and new password are match");
                res.redirect("changePassword")
            }
        }
        else
        {
            req.flash("error","old password does not match");
            res.redirect("changePassword")
        }

}

module.exports.forgotPassword = (req,res) => {
    res.render("forgotPassword");
}

module.exports.forgotPasswordData = async (req,res) => {
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

module.exports.verifyPassword = async (req,res) => {
    let otp = req.session.otp;
    let admin = req.session.adminData;

    if(otp == req.body.otp)
    {
        if(req.body.password == req.body.confirmpass)
        {
            await schema.findByIdAndUpdate(admin._id,{password:req.body.password}).then(()=>{
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