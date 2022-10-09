const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const productSchema = new Schema({
    product_name: {
        type: String,

        trim: true
    },
    category_id: ObjectId,
    sub_category_id: ObjectId,
    description: {
        type: String,

        trim: true
    },
    brand_id: ObjectId,

    product_size: {
        type: Number,

        trim: true
    },
    stock: {
        type: Number,

        trim: true
    },
    price: {
        type: Number,

        trim: true
    },
    image: [
        {
            url: String,
            filename: String
        }
    ]
})

productSchema.plugin(validator);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;