const mongoose = require("mongoose");

const schema = mongoose.Schema({
    subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subCategory",
        required : true
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
    }
})

const productSchema = mongoose.model("product",schema);

module.exports = productSchema;