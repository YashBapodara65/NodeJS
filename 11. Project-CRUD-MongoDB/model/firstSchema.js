const mongoose = require("mongoose");

const schema = mongoose.Schema({
    author : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
})

const firstSchema = mongoose.model("BookApp",schema);

module.exports = firstSchema;