const { string } = require('joi');
const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true
        ,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    user_type: {
        type: String,
        trim: true
    },
    address:[{
        country:{
            type: String,
            trim: true
        },
        address_line:{
            type: String,
            trim: true  
        },
    town:{ type: String,
        trim: true 
     } ,
     state:{
        type: String,
        trim: true  
    },
    post_code:{
        type: String,
        trim: true 
    } 
}]   
})
userSchema.plugin(validator);
const User = mongoose.model('User', userSchema);
module.exports = User;