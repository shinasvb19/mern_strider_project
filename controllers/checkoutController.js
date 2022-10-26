const { session } = require("passport")
const Cart = require("../models/cartSchema")
const User = require("../models/userSchema")
const mongoose = require('mongoose')
const { assert } = require("joi")
const Checkout = require("../models/checkoutSchema");
const Razorpay = require('razorpay')
const { findById } = require("../models/cartSchema")
let instance = new Razorpay({ key_id: process.env.key_id, key_secret:process.env.key_secret })
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
res.redirect('/checkout')
}

const placeOrder =async (req,res)=>{

   
    const {bill, paymentStatus,cart_id} =req.body
    const userId = req.session.user_id;
    const status = req.body.paymentStatus==='cod'?true:false
     const cart = await Cart.findById(cart_id)
     console.log('evide pooyi nee',cart);
     const address = {name:req.body.name,email:req.body.email,mobile:req.body.mobile,address_line:req.body.address_line}
    // const address:
    //   console.log(address) 
    const checkout = new Checkout({
        user_id:userId,
          cart_item: cart.cart_item,
          address,
          paymentStatus,
          bill,
          orderStatus: [{
            date: Date.now(),
            isCompleted:status
          }],
    });
    let insertId = checkout._id
    await checkout.save()
        if(paymentStatus==='cod'){
            const cod = true;
            res.send({cod})
        }
        else{
            // const order= checkout._id
            // const total = b
        const user = await User.findById(userId);
        const fullName = user.firstName+''+user.lastName
       const mobile =  user.mobile
       const email = user.email
       const options = {
        amount: checkout.bill*10, // amount in the smallest currency unit
        currency: "INR",
        receipt: "" + insertId
    };
            instance.orders.create( options,function (err, order) {
                const orderId = order.id;
               
                const userDetails = {
                    fullName,
                    mobile,
                    email,
                };
                res.send({
                    options,
                    userDetails,
                    orderId
                });
    
            console.log(order)   
     
    })
}
}
const paymentSuccess = async (req,res) => {
    const { response,payDetails,cartId,orderId } = req.body;
    let hmac = crypto.createHmac('sha256', 'xtsqSRmSus2vixNarYwdAn37');
    hmac = hmac.update(response.razorpay_order_id + "|" + response.razorpay_payment_id);
    hmac = hmac.digest('hex');
    await cartModel.findByIdAndDelete(cartId);
    if(hmac == response.razorpay_signature) {
        const successOrderId = mongoose.Types.ObjectId(payDetails.receipt);
        await orderModel.findByIdAndUpdate(successOrderId,{orderStatus:'approved',paymentId:orderId});
        req.flash('orderId',successOrderId);
        res.send({paymentStatus:'success'});
    }else {
        res.send({paymentStatus:'fail'});
    }
}
   





exports.placeOrder = placeOrder;
exports.addAddress = addAddress;
exports.checkoutPage = checkoutPage