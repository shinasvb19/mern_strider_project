const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const cartSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    cart_item: [
        {
            product_id: {
                type: ObjectId,
                required: true
            },

            product_quantity: {
                type: Number,
                required: true
            },
            product_size: {
                type: String
            }
        }
    ]
});
cartSchema.plugin(validator);
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
