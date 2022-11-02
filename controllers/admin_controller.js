
const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema');
const Checkout = require('../models/checkoutSchema');
const mongoose = require('mongoose');
const { findByIdAndUpdate } = require('../models/adminSchema');

const signinPage = (req, res) => {

    res.render('admin/adminLogin', { message: req.flash('invalid') })
    // console.log(req.session.username);
}

const signin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
        const validPassword = await bcrypt.compare(password, admin.password);
        if (validPassword) {
            req.session.username = admin.username;
            res.redirect('/admin/dashboard');
        }
        else {
            req.flash('invalid', 'invalid username or password');
            res.redirect('/admin/signin');

        }
    }
    else {
        req.flash('invalid', 'invalid username or password');
        res.redirect('/admin/signin');
    }

}

const adminDashbord = (req, res) => {
    res.render('admin/admin')
}

const product = (req, res) => {
    res.render('admin/addProduct');
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/signin')
}

const sessionCheck = (req, res, next) => {
    if (req.session.username) {

        res.redirect('/admin/dashboard');
    } else {
        next();
    }
}

const sessionCheckDashboard = (req, res, next) => {
    if (req.session.username) {
        next();
    }
    else {
        res.redirect('/admin/signin')
    }

}
const orders =async (req,res)=> {
    const checkout = await Checkout.aggregate([{$match:{isCompleted:true}}])      
    res.render('admin/orderManagement',{checkout})
    
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
//  console.log(checkout[0].orderStatus);
 
 res.send({checkout})
 
  }
  const orderEdit = async (req,res) => {
//    console.log(req.body)
  let {checkoutId}= req.body
  let {result}= req.body;

  checkoutId = mongoose.Types.ObjectId(checkoutId);
//   await Checkout.findByIdAndUpdate{}
// let delivered ='packed'
const checkout = await Checkout.findById({_id:checkoutId})
const id=checkout.orderStatus[0]._id
  await  Checkout.findOneAndUpdate({ $and: [{_id:checkoutId }, { 'orderStatus._id':id }] }, {$set:{'orderStatus.$.type':result} });
// console.log('thiss',a);

res.send({checkout})
  }
  
  const address = async (req,res) => {
    let { checkoutId }= req.body
    checkoutId = mongoose.Types.ObjectId(checkoutId);
    const checkout = await Checkout.findById({_id:checkoutId})
    res.send({checkout})

  }
  
exports.address = address;
exports.orderEdit = orderEdit;
exports.orderView = orderView;
exports.orders = orders;
exports.sessionCheckDashboard = sessionCheckDashboard;
exports.sessionCheck = sessionCheck;
exports.product = product;
exports.signin = signin;
exports.signinPage = signinPage;
exports.adminDashbord = adminDashbord;
exports.logout = logout;