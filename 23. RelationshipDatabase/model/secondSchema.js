const mongoose = require("mongoose")

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

const secondSchema = mongoose.model("category",schema);
module.exports = secondSchema;