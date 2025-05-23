const schema = require("../model/secondSchema");
const catSchema = require("../model/catSchema");

module.exports.addSubCategory = async (req,res) => {
    await schema.find({}).then((data)=>{
        res.render("addSubCategory",{data});
    })
}

module.exports.addSubCategoryRecord = async (req,res) => {
    await catSchema.create(req.body).then(()=>{
        res.redirect("/subcategory/addSubCategory");
    })
}

module.exports.viewSubCategory = async (req,res) => {
    await catSchema.find().populate("categoryId").then((data)=>{
        res.render("viewSubCategory",{data});
    })
}