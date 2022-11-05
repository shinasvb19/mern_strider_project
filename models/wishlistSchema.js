const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const wishlistSchema = new Schema({ 
    userId:ObjectId,  
  products:[ObjectId], 
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;

