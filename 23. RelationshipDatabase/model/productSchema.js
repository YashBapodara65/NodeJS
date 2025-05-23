const mongoose = require("mongoose")

const schema = mongoose.Schema({
    sub_category_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subcategory",
    },
    product_image : {
        type : String,
        required : true
    },
    product_name : {
        type : String,
        required : true
    },
    product_price : {
        type : String,
        required : true
    },
});

const prodSchema = mongoose.model("product",schema);
module.exports = prodSchema;