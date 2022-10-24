const { session } = require("passport")
const Cart = require("../models/cartSchema")
const User = require("../models/userSchema")
const mongoose = require('mongoose')

const checkoutPage = async (req,res)=>{
   const session = req.session.username
   let user_id = req.session.user_id
   user_id= mongoose.Types.ObjectId(user_id);
   const user = await User.findById(user_id)
   const cart = await Cart.aggregate([
    { $match: { user_id } },
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
  console.log(cart)
   
    res.render('user/checkout',{session,user,cart})
}
const addAddress = async (req,res)=>{
const{country,address_line,town,state,post_code,mobile,email} = req.body

id = req.session.user_id
await User.updateOne({ id }, { $push: { address: { country,address_line,town,state,post_code,mobile,email } } });
console.log(data)
}






exports.addAddress = addAddress;
exports.checkoutPage = checkoutPage