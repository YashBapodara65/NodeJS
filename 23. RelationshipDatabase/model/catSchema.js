const mongoose = require("mongoose")

const schema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category", // table name of reference and id
        required : true
    },
    subcategory_name : {
        type : String,
        required : true
    }
});

const catSchema = mongoose.model("subcategory",schema);
module.exports = catSchema;