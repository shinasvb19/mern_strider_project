const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    }

})
adminSchema.plugin(validator);
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;