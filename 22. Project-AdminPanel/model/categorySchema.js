const mongoose = require("mongoose");

const schema = mongoose.Schema({
    category_image : {
        type : String,
        required : true
    },
    category_name : {
        type : String,
        required : true
    }
});

const categorySchema = mongoose.model("category",schema);
module.exports = categorySchema;