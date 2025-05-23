const schema = require("../model/subCatSchema");
const Catschema = require("../model/categorySchema");

module.exports.addSubCategory = async (req,res) => {
    await Catschema.find({}).then((data)=>{
        res.render("addSubCategory",{data});
    })
}

module.exports.addSubCategoryRecord = async (req,res) => {
    await schema.create(req.body).then(()=>{
        res.redirect("/subcategory/addSubCategory");
    })
}

module.exports.viewSubCategory = async (req,res) => {
    await schema.find({}).populate("categoryId").then((data)=>{
        res.render("viewSubCategory",{data});
    })
}