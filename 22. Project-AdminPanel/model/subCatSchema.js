const mongoose = require("mongoose");

const schema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category",
        required : true
    },
    subcategory_name : {
        type : String,
        required : true
    }
})

const subCatSchema = mongoose.model("subCategory",schema);

module.exports = subCatSchema;