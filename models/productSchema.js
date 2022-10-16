const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const productSchema = new Schema({
    product_name: {
        type: String,
        unique: true,
        trim: true
    },
    category_id: ObjectId,
    subcategory_id: ObjectId,
    brand_id: ObjectId,
    description: {
        type: String,

        trim: true
    },
    details: {
        type: String,

        trim: true
    },
    product_size: [{
        small: {
            small_stock: Number
        },
        medium: {
            medium_stock: Number
        },
        large: {
            large_stock: Number
        }

    }
    ]
    ,
    price: {
        type: Number,

        trim: true
    },
    mrp: {
        type: Number,

        trim: true
    },
    image: [

        {
            url: String,
            filename: String,

        }
    ]
})

productSchema.plugin(validator);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;