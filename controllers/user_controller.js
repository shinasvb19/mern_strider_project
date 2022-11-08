const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const bcrypt = require('bcrypt');
const Product = require("../models/productSchema");
const mongoose = require('mongoose');
const { findByIdAndUpdate, findByIdAndDelete, countDocuments } = require("../models/userSchema");
const { required } = require("joi");
const swal = require('sweetalert');
const Cart = require("../models/cartSchema");
const { findOne } = require("../models/cartSchema");
const Checkout = require("../models/checkoutSchema");
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;  
const  authSecret = process.env.TWILIO_AUTH_SECRET;
const twilio = require('twilio');
const client = require('twilio')(accountSid,authToken);
const signupPage = (req, res) => {

    res.render('usersignup')
}
const signup = async (req, res) => {
    const { username, firstName, lastName, mobile, email, password, user_type } = req.body;
    const isVerified = false;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        firstName,
        lastName,
        mobile,
        email,
        user_type,
        password: hash,
        isVerified
    })
    try {
        await user.save()
    } catch (error) {
        console.log(error)
        req.flash('error', 'valdation error');
        
        // res.redirect('/users/signup')
    }
    res.redirect('/users/otp?channel=sms&phonenumber=+91'+mobile);
}

const signinPage = (req, res) => {
    res.render('signin')
}

const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        req.session.username = user.username;
        req.session.user_type = user.user_type;
        req.session.user_id = user._id;

        res.redirect('/')
    }
    else {
        res.flash('invalid', 'invalid user name or password');
    }

}
const profile = async (req,res)=>{
    const session= req.session.username
    let sessionId= req.session.user_id
//    sessionId = mongoose.Types.ObjectId(sessionId);
   const userDetails = await User.findById(sessionId)
  res.render('user/userProfile',{session,userDetails})
}
const profilePut = async (req,res)=>{
     const id = req.session.user_id
     const username = req.session.username
     const {firstName, lastName , mobile ,email} = req.body
     const address = {country:req.body.country, address_line:req.body.address_line, town:req.body.town, 
        state:req.body.state,post_code:req.body.post_code}
     const update = await User.findByIdAndUpdate(id,{firstName, lastName,mobile,email,username,address}
     )
    // res.redirect('/')
    }
const addressGet = async (req,res) =>{
    const session = req.session.username
    const user_id = req.session.user_id
    const user = await User.findById(user_id)
    const cart = await Cart.find({user_id})

   res.render('user/profileAddress',{session,user,cart})
}
  const deleteAddress = async (req,res)=>{
    const id = req.session.user_id
    const addressId = req.params.id
    await User.updateOne({id},{$pull:{address:{"_id":addressId}}});
    res.redirect('/users/profile/address')
  } 

  const showOrders = async (req,res)=>{
    id = req.session.user_id
 const checkout = await Checkout.aggregate([{$match:{userId:id,isCompleted:true}}])

//  const checkout = await Checkout.aggregate([{$match:{userId:id,isCompleted:true}}, 
//     { $unwind: '$cart_item' },
//     {$project:{product_id:'$cart_item.product_id',product_quantity: '$cart_item.product_quantity',
//     product_size:'$cart_item.product_size',paymentStatus:'$paymentStatus',
//     bill:'$bill',orderStatus:'$orderStatus' } },
//     {$lookup: {
//     from: 'products',
//     localField: 'product_id', foreignField: '_id', as: 'products'
// }}])
//  console.log('lookup result',checkout)
// console.log(checkout)
const session =req.session.user_id;


    res.render('user/showOrders',{checkout,session})
  }
  const orderCancel = async (req,res)=>{
   const id = mongoose.Types.ObjectId(req.body)
    // console.log(id);
    const del = true
    await Checkout.findByIdAndDelete({_id:id})
    res.send({del})
  }
 const  orderView = async (req,res)=>{
   let {checkoutId}= req.body
   checkoutId = mongoose.Types.ObjectId(checkoutId);
    console.log(checkoutId);
 const checkout = await Checkout.aggregate([{$match:{_id:checkoutId,isCompleted:true}}, 
    { $unwind: '$cart_item' },
    {$project:{product_id:'$cart_item.product_id',product_quantity: '$cart_item.product_quantity',
    product_size:'$cart_item.product_size',paymentStatus:'$paymentStatus',
    bill:'$bill',orderStatus:'$orderStatus' } },
    {$lookup: {
    from: 'products',
    localField: 'product_id', foreignField: '_id', as: 'products'
}}])
console.log(checkout);

res.send({checkout})

 }
 const logout = (req, res) => {
  
    req.session.destroy();
    res.redirect('/users/signin')
}
const otpPage = (req, res) => {
  let number = req.query.phonenumber.trim()
    client
    .verify
    .services(authSecret)
    .verifications
    .create({
        to:`+${number}`,
        channel: req.query.channel
    }).then((data)=>{
        res.status(200).res.send(data)
    })
const mobile =number;
    console.log(mobile);
 res.render('user/otp',{mobile})
}
const otpPost =async (req, res) => {
    let mobileNo = req.body.mobile
    mobileNo = mobileNo.toString()
   mobileNo = mobileNo.slice(2)
   mobileNo = Number(mobileNo)
  console.log(req.body.mobile);
    client 
    .verify.services(authSecret)
    .verificationChecks
 
    .create({
        to: `+${req.body.mobile}`,
        code:req.body.otp
    
}).then(async(data)=>{
  await User.updateOne({mobile:mobileNo},{$set:{isVerified:true}})
  res.redirect('/users/signin') 
})
}
exports.otpPost = otpPost;
exports.otpPage = otpPage;
exports.logout= logout;
exports.orderView = orderView;
exports.orderCancel = orderCancel;
exports.showOrders = showOrders;
exports.addressGet = addressGet;   
exports.deleteAddress = deleteAddress;
exports.profilePut = profilePut;
exports.profile = profile;
exports.signupPage = signupPage;
exports.signup = signup;
exports.signinPage = signinPage;
exports.signin = signin;
