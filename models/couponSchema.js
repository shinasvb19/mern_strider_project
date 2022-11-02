const mongoose = require('mongoose')
const validator = require("mongoose-unique-validator");
const couponSchema = new mongoose.Schema({
    couponName:{
        type:String,
        required:true,
        trim: true
    },
    dicount:{
        type:Number,
        required:true,
        trim: true
    },
    maximumLimit:{
        type:Number,
        required:true,
        trim: true
    },
    expiryDate:{
        type: Date
 },
   },
 {timestamps: true})

   couponSchema.plugin(validator);
   const Coupon = mongoose.model('Coupon', couponSchema);
   module.exports = Coupon;