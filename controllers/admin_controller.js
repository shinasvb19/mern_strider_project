
const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema');
const Checkout = require('../models/checkoutSchema');
const mongoose = require('mongoose');
const { findByIdAndUpdate } = require('../models/adminSchema');
const User = require('../models/userSchema');

const signinPage = (req, res) => {

    res.render('admin/adminLogin', { message: req.flash('invalid') })
    // console.log(req.session.username);
}

const signin = async (req, res) => {
    let { username, password } = req.body;
    username= username.toString();
    password = password.toString();
    console.log(req.body);
   const userName = 'shinasvb'
    const passwordNew ='ab'
    console.log(userName);
    if (username==userName&&password==passwordNew) {
      req.session.adminName = userName;
      req.session.adminId = passwordNew;
    
      res.redirect('/admin/dashboard');
    }
    else{
      res.redirect('/admin/signin');
    }
    // const admin = await Admin.findOne({ username });
    // if (admin) {
    //     const validPassword = await bcrypt.compare(password, admin.password);
    //     if (validPassword) {
    //         req.session.adminName = admin.username;
    //         req.session.adminId = admin._id;
    //         res.redirect('/admin/dashboard');
    //     }
    //     else {
    //         req.flash('invalid', 'invalid username or password');
    //         res.redirect('/admin/signin');

    //     }
    // }
    // else {
    //     req.flash('invalid', 'invalid username or password');
    //     res.redirect('/admin/signin');
    // }

}

const adminDashbord =async (req, res) => {
    const graph = await Checkout.aggregate(
        [
           {
             $group : {
                _id : { month: { $month: "$createdAt" }, day: { $dayOfMonth: "$createdAt" }, year: { $year: "$createdAt" } },
                totalPrice: { $sum: '$bill' },
                count: { $sum: 1 }
    
                     }
    
                   },{$sort:{_id:-1}},
                   {$project:{totalPrice:1,_id:0}},{$limit:5}
                ]
             );
            //  console.log(graph)
             let values = [];
             let revenue = []
             graph.forEach((g)=> {
                values.push(g.totalPrice)
                revenue.push(g.totalPrice*10/100)
            })

    const shipped= await Checkout.find({$and:[{createdAt:{$lt:Date.now(),$gt:Date.now() - 2629800000}},{'orderStatus.type':'shipped'}]}).count()
    const delivered = await Checkout.find({$and:[{createdAt:{$lt:Date.now(),$gt:Date.now() - 2629800000}},{'orderStatus.type':'delivered'}]}).count()
    const packed = await Checkout.find({$and:[{createdAt:{$lt:Date.now(),$gt:Date.now() - 2629800000}},{'orderStatus.type':'packed'}]}).count()
    const cancelled = await Checkout.find({$and:[{createdAt:{$lt:Date.now(),$gt:Date.now() - 2629800000}},{'orderStatus.type':'canceled'}]}).count()
    const ordered = await Checkout.find({$and:[{createdAt:{$lt:Date.now(),$gt:Date.now() - 2629800000}},{'orderStatus.type':'ordered'}]}).count()
    //  console.log('shareef idea',ordered )
    //  console.log('shareef idea',dailySale )
  const totalOrders = await Checkout.find({isCompleted:true}).count()
  const usersTotal = await User.find().count()
  const salesReport = await Checkout.aggregate(
    [
      {
        $project: {
          salesTotal: { $sum: "$bill"}
         
        }
      }
    ]
 )
 let salesSum = salesReport.reduce((partialSum, values) => partialSum + values.salesTotal,0)
  // console.log(sum);
    
    res.render('admin/admin',{values,revenue,shipped,delivered,packed,cancelled,ordered,totalOrders,usersTotal,salesSum})
}

const product = (req, res) => {
    res.render('admin/addProduct');
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/signin')
}


const orders =async (req,res)=> {
  const checkout = await Checkout.find({isCompleted:true}).sort({createdAt:-1})
    // const checkout = await Checkout.aggregate([{$match:{isCompleted:true}},{$sort:{createdAt:-1}}])   
    // console.log('this mate',checkout1);   
    res.render('admin/orderManagement',{checkout})
    
}
const  orderView = async (req,res)=>{
    let {checkoutId}= req.body
    checkoutId = mongoose.Types.ObjectId(checkoutId);
    //  console.log(checkoutId);
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
exports.product = product;
exports.signin = signin;
exports.signinPage = signinPage;
exports.adminDashbord = adminDashbord;
exports.logout = logout;