const Cart = require("../models/cartSchema");
const mongoose = require('mongoose');

const cartPage = async (req, res) => {
    let session = req.session.user_id
    session = mongoose.Types.ObjectId(session);
    //  const cardItem = await Cart.findOne({ user_id: session })

    const cartAgregate = await Cart.aggregate([
        { $match: { user_id: session } },
        { $unwind: '$cart_item' },
        {
            $project:
            {
                product_id: '$cart_item.product_id',
                itemQuantity: '$cart_item.product_quantity',
                size: '$cart_item.product_size'
            }
        },

        {
            $lookup: {
                from: 'products',
                localField: 'product_id', foreignField: '_id', as: 'products'
            }
        }
    ])
    console.log(cartAgregate)

    res.render('user/cart', { session, cartAgregate })
}

const cartPost = async (req, res) => {
    let user_id = req.session.user_id;
    user_id = mongoose.Types.ObjectId(user_id);
    // console.log(req.body)
    // console.log(req.session)

    if (user_id) {
        // console.log("   user id    ", user_id);
        const { product_id, product_size, product_quantity } = req.body;


        const cart = await Cart.findOne({ user_id });
        if (cart) {

            let productx = await Cart.findOne({ $and: [{ user_id }, { cart_item: { $elemMatch: { product_id, product_size } } }] });
            if (productx) {
                // console.log("use exits", productx)
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
const quantity = async (req, res) => {
    let user_id = req.session.user_id;
    user_id = mongoose.Types.ObjectId(user_id);
    let {cart, product ,size , count} = req.body;
    const product_id = product;
    const  product_size = size;
    await  Cart.findOneAndUpdate({ $and: [{ user_id }, { "cart_item.product_id": product_id }, { "cart_item.product_size": product_size }] }, { $inc: { "cart_item.$.product_quantity": count } });
    //  console.log("prouct exites"     , productx.user_id);;
}
const cartItemDelete = async (req,res) =>{
    // console.log('here now..',req.body)
    const productId = new mongoose.Types.ObjectId(req.body.product);
    let user_id= (req.session.user_id);
    // console.log(productId)
    await Cart.updateOne({user_id},{$pull:{cart_item:{"product_id":productId}}});
}

exports.cartItemDelete = cartItemDelete; 
exports.quantity = quantity;
exports.cartPost = cartPost;
exports.cartPage = cartPage;