const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    image_path : {
        type: String,
        required: true
    }
})

const firstSchema = mongoose.model("Student",schema);

module.exports = firstSchema;