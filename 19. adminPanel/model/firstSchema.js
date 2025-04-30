const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user_image : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    contactNo : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
});

const firstSchema = mongoose.model("adminData",schema);

module.exports = firstSchema;