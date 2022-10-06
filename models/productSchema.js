const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    category_id: ObjectId,
    description: {
        type: String,
        required: true,
        trim: true
    },
    brand_id: ObjectId,

    product_size: {
        type: Number,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    image_url: {
        type: String,
        required: true,
        trim: true
    }
})

productSchema.plugin(validator);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;