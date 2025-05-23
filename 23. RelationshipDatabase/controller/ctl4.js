const prodSchema = require("../model/productSchema");
const catSchema = require("../model/catSchema");

module.exports.addProduct = async (req,res) => {
    await catSchema.find({}).then((data)=>{
        res.render("addProduct",{data});
    })
}

module.exports.addProductRecord = async (req,res) => {
    req.body.product_image = req.file.path;
    await prodSchema.create(req.body).then(()=>{
        res.redirect("/product/addProduct");
    })
}

module.exports.viewProductRecord = async (req,res) => {
    await prodSchema.find({}).populate({
        path : "sub_category_id",
        populate : {
            path : "categoryId"
        }
    }).then((data)=>{
        res.render("viewProduct",{data});
        // console.log(data);
    })
}