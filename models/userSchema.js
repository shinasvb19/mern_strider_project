const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

})
userSchema.plugin(validator);
const User = mongoose.model('User', userSchema);
module.exports = User;