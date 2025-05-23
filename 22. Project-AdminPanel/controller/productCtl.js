const schema = require("../model/productSchema");
const productSchema = require("../model/subCatSchema");

module.exports.addProduct = async (req,res) => {
    await productSchema.find({}).then((data)=>{
        res.render("addProduct",{data});
    })
}

module.exports.addProductRecord = async (req,res) => {
    req.body.product_image = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/product/addProduct");
    })
}

module.exports.viewProduct = async (req,res) => {
    await schema.find({}).populate({
        path : "subcategoryId",
        populate : {
            path : "categoryId"
        }
    }).then((data)=>{
        res.render("viewProduct",{data});
    })
}