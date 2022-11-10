const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const discountBannerSchema = mongoose.Schema({
name: {
    type: String,
   
    trim: true
},
couponName: {
    type: String,
   
    trim: true
},
discount: {
    type: Number,
   
    trim: true
},
expiry: {
    type: Number,
  
    trim: true
},
imageOne: [

    {
        url: String,
        filename: String,

    }
],




},{timestamps: true})

const Discount = mongoose.model('discount', discountBannerSchema);
module.exports = Discount;