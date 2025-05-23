const schema = require("../model/secondSchema");

module.exports.addCategory = (req,res) => {
    res.render("addCategory");
}

module.exports.addCategoryRecord = async (req,res) => {
    req.body.category_image = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/category/addCategory");
    })
}

module.exports.viewCategory = async (req,res) => {
    await schema.find().then((data)=>{
        res.render("viewCategory",{data});
    })
}