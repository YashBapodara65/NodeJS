const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    image_path : {
        type : String,
        required : true
    },
})

const firstSchema = mongoose.model("Student",schema);
module.exports = firstSchema;