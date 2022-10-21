const Cart = require("../models/cartSchema");
const mongoose = require('mongoose');

const cartPage = async (req, res) => {
    const session = req.session.username
    const cartFind = await Cart.find({})
    const cartAgregate = await Cart.aggregate([{
        $lookup: {
            from: 'categories',
            localField: 'category_id', foreignField: '_id', as: 'category'
        }
    },
    {
        $lookup: {
            from: 'subcategories',
            localField: 'subcategory_id', foreignField: '_id', as: 'subcategory'
        }

    }])
    res.render('user/cart', { session })
}

const cartPost = async (req, res) => {
    let user_id = req.session.user_id;
    user_id = mongoose.Types.ObjectId(user_id);
    console.log(req.body)
    console.log(req.session)

    if (user_id) {
        console.log("   user id    ", user_id);
        const { product_id, product_size, product_quantity } = req.body;


        const cart = await Cart.findOne({ user_id });
        if (cart) {

            let productx = await Cart.findOne({ $and: [{ user_id }, { cart_item: { $elemMatch: { product_id, product_size } } }] });
            if (productx) {
                console.log("use exits", productx)
                await Cart.findOneAndUpdate({ $and: [{ user_id }, { "cart_item.product_id": product_id }, { "cart_item.product_size": product_size }] }, { $inc: { "cart_item.$.product_quantity": product_quantity } });
                //  console.log("prouct exites"     , productx.user_id);
            } else {
                await Cart.updateOne({ user_id }, { $push: { cart_item: { product_id, product_size, product_quantity: product_quantity } } });
            }
        } else {
            const cart = new Cart({ user_id, cart_item: [{ product_id, product_size, product_quantity }] });
            try {
                await cart.save();
            } catch (err) {
                const msg = 'Cart adding failed';
                res.send({ msg });
            }

            //   console.log(); 
        }

        res.redirect("/cart")
    } else {
        res.redirect("/login");
    }
}


exports.cartPost = cartPost;
exports.cartPage = cartPage;